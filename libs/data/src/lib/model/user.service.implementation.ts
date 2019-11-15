import { Injectable } from '@nestjs/common';
import { LoginHandler, UserModel, UserProfileModel, UserProfileModelIdentity, UserService } from '@erpjs/model';
import { AppUser, ModelModule, Session } from '../..';
import { UserIdentity } from '../entities/user.identity';
import { Implement } from './base.service.implementation';

const SESSION_ID = '##user##';

@Injectable()
export class UserServiceImplementation extends Implement(UserService) implements LoginHandler {
  static currentUser(): AppUser {
    return Session.get(SESSION_ID);
  }

  static setCurrentUser(user: AppUser) {
    Session.set(SESSION_ID, user);
  }
  static clearCurrentUser() {
    Session.set(SESSION_ID, undefined);
  }

  constructor() {
    super();

    this.getCurrentUser = () => Session.get(SESSION_ID);
    this.findUserByEmail = async (email) => this.findUserByEmail1(email);
    this.findUserIdentity = async (userProfileIdentities) => this.findUserIdentity1(userProfileIdentities);
    this.findUser = async (userProfileModel) => this.findUser1(userProfileModel);
    this.convertProfileIdentities
      = async (user, userProfileIdentities) => this.convertProfileIdentities1(user, userProfileIdentities);
    this.createNewUser = async (userProfileModel) => this.createNewUser1(userProfileModel);
  }

  async findUserByEmail1(email: string): Promise<AppUser> {
    const manager = ModelModule.getEntityManager();
    if (!email) return null;
    const found = await manager.getRepository(AppUser).findOne({where: { email }});
    return found? found : null;
  }

  async findUserIdentity1(userProfileIdentities: Array<UserProfileModelIdentity>): Promise<UserIdentity> {
    const manager = ModelModule.getEntityManager();
    const userId = userProfileIdentities[0].user_id;
    const provider = userProfileIdentities[0].provider;
    if (!userId || !provider) return null;
    const found = await manager.getRepository(UserIdentity).findOne({where: { externalUser: userId, provider }});
    return found? found : null;
  }
  async findUser1(userProfileModel: UserProfileModel): Promise<UserModel> {
    const email = userProfileModel.email;
    return await this.findUserByEmail(email);
  }
  async convertProfileIdentities1(user: UserModel, userProfileIdentities: Array<UserProfileModelIdentity>):
    Promise<Array<UserIdentity>> {
    const manager = ModelModule.getEntityManager();
    const result : Array<UserIdentity> = [];
    for( const userProfileIdentity of userProfileIdentities ) {
      const userIdentity = new UserIdentity();
      userIdentity.externalUser = userProfileIdentity.user_id;
      userIdentity.provider = userProfileIdentity.provider;
      userIdentity.user = Promise.resolve(user);
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
  async createNewUser1(userProfileModel: UserProfileModel): Promise<AppUser> {
    const manager = ModelModule.getEntityManager();
    const result = new AppUser();
    result.email = userProfileModel.email;
    result.name = userProfileModel.name;
    await manager.save(result);
    const ident = userProfileModel.identities[0];
    const userIdentity = new UserIdentity();
    userIdentity.externalUser = ident.user_id;
    userIdentity.provider = ident.provider;
    userIdentity.user = Promise.resolve(result);
    await manager.save(userIdentity);
    result.identities = Promise.resolve([userIdentity]);
    return result;
  }

  async handleLogin(
    login: UserProfileModel,
  ): Promise<UserModel> {
    return await super.handleLogin(login);
  }
}
