import { Injectable } from '@nestjs/common';
import { UserProfileModel, UserProfileModelIdentity, UserService } from '@erpjs/model';
import { AppUser, Session } from '../..';
import { UserIdentity } from '../entities/user.identity';
import { EntityManager } from 'typeorm';

const SESSION_ID = '##user##';

@Injectable()
export class UserServiceImplementation extends UserService<AppUser, EntityManager> {
  static currentUser(): AppUser {
    return Session.get(SESSION_ID);
  }

  static setCurrentUser(user: AppUser) {
    Session.set(SESSION_ID, user);
  }
  static clearCurrentUser() {
    Session.set(SESSION_ID, undefined);
  }

  getCurrentUser(): AppUser {
    return Session.get(SESSION_ID);
  }

  async findUserIdentity(userProfileIdentities: Array<UserProfileModelIdentity>, manager: EntityManager): Promise<UserIdentity> {
    const userId = userProfileIdentities[0].user_id;
    const provider = userProfileIdentities[0].provider;
    if (!userId || !provider) return null;
    const found = await manager.getRepository(UserIdentity).findOne({where: { externalUser: userId, provider }});
    return found? found : null;
  }
  async findUser(userProfileModel: UserProfileModel, manager: EntityManager): Promise<AppUser> {
    const email = userProfileModel.email;
    if (!email) return null;
    const found = await manager.getRepository(AppUser).findOne({where: { email }});
    return found? found : null;
  }
  async convertProfileIdentities(user: AppUser, userProfileIdentities: Array<UserProfileModelIdentity>, context: EntityManager):
    Promise<Array<UserIdentity>> {
    const result : Array<UserIdentity> = [];
    for( const userProfileIdentity of userProfileIdentities ) {
      const userIdentity = new UserIdentity();
      userIdentity.externalUser = userProfileIdentity.user_id;
      userIdentity.provider = userProfileIdentity.provider;
      userIdentity.user = Promise.resolve(user);
      try {
        await context.save(userIdentity);
        result.push(userIdentity);
      } catch (err) {
        console.log('FAILED:', err);
        throw err;
      }
    }
    return result;
  }
  async createNewUser(userProfileModel: UserProfileModel, manager: EntityManager): Promise<AppUser> {
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
}
