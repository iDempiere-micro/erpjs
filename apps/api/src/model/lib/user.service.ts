import { UserModel } from './user.model';
import { UserProfileModel } from './user.profile.model';
import { UserSaveArgsModel } from './user.save.args.model';
import { BaseEntityService } from './base.entity.service';
import { EntityManager, Repository } from 'typeorm';
import { UserProfileModelIdentity } from './user.profile.model.identity';
import { User } from '../generated/entities/User';
import { UserIdentity } from '../generated/entities/UserIdentity';
import { Injectable } from '@nestjs/common';

export const UserServiceKey = 'UserService';

export interface LoginHandler {
  /**
   * Handle successful user login and map to UserModel
   * @param manager - entity manager
   * @param login - a user profile of a successfully logged user
   */
  handleLogin(
    manager: EntityManager,
    login: UserProfileModel,
  ): Promise<UserModel>;
}

export const getTechnicalUser = (manager: EntityManager) =>
  manager
    .getRepository(User)
    .findOne({ where: { email: process.env.TECHNICAL_USER_EMAIL } });

/**
 * User service to handle possibly multiple user identities and automatic user creation on a successful login-
 */
@Injectable()
export class UserService extends BaseEntityService<UserModel, UserSaveArgsModel>
  implements LoginHandler {
  createEntity(): UserModel {
    return new User();
  }

  protected getRepository(transactionalEntityManager): Repository<UserModel> {
    return transactionalEntityManager.getRepository(User);
  }

  async findUserByEmail(manager: EntityManager, email: string): Promise<User> {
    if (!email) return null;
    const found = await manager
      .getRepository(User)
      .findOne({ where: { email } });
    return found || null;
  }

  async findUserIdentity(
    manager: EntityManager,
    userProfileIdentities: Array<UserProfileModelIdentity>,
  ): Promise<UserIdentity> {
    const userId = userProfileIdentities[0].user_id;
    const provider = userProfileIdentities[0].provider;
    if (!userId || !provider) return null;
    const found = await manager
      .getRepository(UserIdentity)
      .findOne({ where: { externalUser: userId, provider } });
    return found || null;
  }
  async findUser(
    manager: EntityManager,
    userProfileModel: UserProfileModel,
  ): Promise<UserModel> {
    const email = userProfileModel.email;
    return await this.findUserByEmail(manager, email);
  }
  async convertProfileIdentities(
    manager: EntityManager,
    user: UserModel,
    userProfileIdentities: Array<UserProfileModelIdentity>,
  ): Promise<Array<UserIdentity>> {
    const result: Array<UserIdentity> = [];
    for (const userProfileIdentity of userProfileIdentities) {
      const userIdentity = new UserIdentity();
      userIdentity.externalUser = userProfileIdentity.user_id;
      userIdentity.provider = userProfileIdentity.provider;
      userIdentity.user = user;
      userIdentity.updtOp = user;
      try {
        await manager.save(userIdentity);
        result.push(userIdentity);
      } catch (err) {
        console.log('FAILED:', err);
        throw err;
      }
    }
    return result;
  }
  async createNewUser(
    manager: EntityManager,
    userProfileModel: UserProfileModel,
    technicalUser: UserModel
  ): Promise<User> {
    const result = new User();
    result.email = userProfileModel.email;
    result.name = userProfileModel.name;
    result.updtOpId = technicalUser.id;
    await manager.save(result);
    const ident = userProfileModel.identities[0];
    const userIdentity = new UserIdentity();
    userIdentity.externalUser = ident.user_id;
    userIdentity.provider = ident.provider;
    userIdentity.user = result;
    userIdentity.updtOp = result;
    await manager.save(userIdentity);
    result.identities = [userIdentity];
    return result;
  }

  protected async doSave(
    manager: EntityManager,
    args: UserSaveArgsModel,
    entity: UserModel,
  ): Promise<UserModel> {
    return entity;
  }

  typeName(): string {
    return UserServiceKey;
  }

  /**
   * Handle successful user login and map to UserModel
   * @param manager - entity manager
   * @param login - a user profile of a successfully logged user
   */
  async handleLogin(
    manager: EntityManager,
    login: UserProfileModel,
  ): Promise<UserModel> {
    if (!login || !login.identities) return null;
    const existingUserIdentity = await this.findUserIdentity(
      manager,
      login.identities,
    );
    if (existingUserIdentity) {
      return existingUserIdentity.user;
    } else {
      // we do not have the identity; we must first try to find out if we have the same User already
      const technicalUser = await getTechnicalUser(manager);
      const existingUser = await this.findUser(manager, login);
      if (existingUser) {
        const converted = await this.convertProfileIdentities(
          manager,
          existingUser,
          login.identities,
        );
        existingUser.identities.push(...converted);
        return existingUser;
      } else {
        // this is a completely new user
        return await this.createNewUser(manager, login, technicalUser);
      }
    }
  }
}
