import { UserModel } from '../entities/user.model';
import { UserProfileModelIdentity } from '../helpers/user.profile.model.identity';
import { UserIdentityModel } from '../entities/user.identity.model';
import { UserProfileModel } from '../helpers/user.profile.model';
import { BaseEntityServiceImplementation } from './base.entity.service';
import { UserSaveArgsModel } from '../args/user.save.args.model';

export const UserServiceKey = 'UserService';

export interface LoginHandler {
  /**
   * Handle successful user login and map to UserModel
   * @param login - a user profile of a successfully logged user
   */
  handleLogin(
    login: UserProfileModel,
  ): Promise<UserModel>;
}

/**
 * User service to handle possibly multiple user identities and automatic user creation on a successful login-
 */
export class UserService
  extends BaseEntityServiceImplementation<UserModel, UserSaveArgsModel>
  implements LoginHandler
{
  getCurrentUser: () => UserModel;
  findUserIdentity: (userProfileIdentities: Array<UserProfileModelIdentity>) => Promise<UserIdentityModel>;
  findUser: (UserProfileModel) => Promise<UserModel>;
  convertProfileIdentities: (user: UserModel, userProfileIdentities: Array<UserProfileModelIdentity>) =>
    Promise<Array<UserIdentityModel>>;
  createNewUser: (UserProfileModel) => Promise<UserModel>;
  findUserByEmail:(email: string) => Promise<UserModel>;

  protected async doSave(args: UserSaveArgsModel, entity: UserModel): Promise<UserModel> {
    return entity;
  }

  typeName(): string {
    return UserServiceKey;
  }

  /**
   * Handle successful user login and map to UserModel
   * @param login - a user profile of a successfully logged user
   */
  async handleLogin(
    login: UserProfileModel,
  ): Promise<UserModel> {
    if ( !login || !login.identities ) return null;
    const existingUserIdentity = await this.findUserIdentity(login.identities);
    if (existingUserIdentity) {
      return Promise.resolve(await existingUserIdentity.user);
    } else {
      // we do not have the identity; we must first try to find out if we have the same User already
      const existingUser = await this.findUser(login);
      if (existingUser) {
        const converted = await this.convertProfileIdentities(existingUser, login.identities);
        (await existingUser.identities).push(...converted);
        return existingUser;
      } else {
        // this is a completely new user
        return Promise.resolve(await this.createNewUser(login));
      }
    }
  }
}
