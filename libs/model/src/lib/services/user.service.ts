import { UserIdentityModel, UserModel, UserProfileModel, UserProfileModelIdentity } from '../..';

/**
 * User service to handle possibly multiple user identities and automatic user creation on a successful login-
 */
export abstract class UserService<T extends UserModel<any>, R> {
  abstract getCurrentUser(): T;
  abstract findUserIdentity(userProfileIdentities: Array<UserProfileModelIdentity>, context: R): Promise<UserIdentityModel<T>>;
  abstract findUser(UserProfileModel, context: R) : Promise<T>;
  abstract convertProfileIdentities(user: T, userProfileIdentities: Array<UserProfileModelIdentity>, context: R) :
    Promise<Array<UserIdentityModel<T>>>;
  abstract createNewUser (UserProfileModel, context: R) : Promise<T>;


  /**
   * Handle successful user login and map to UserModel
   * @param login - a user profile of a successfully logged user
   * @param context - general context that may be needed in the implemetation class
   */
  async handleLogin(
    login: UserProfileModel,
    context: R,
  ): Promise<T> {
    if ( !login || !login.identities ) return null;
    const existingUserIdentity = await this.findUserIdentity(login.identities, context);
    if (existingUserIdentity) {
      return Promise.resolve(await existingUserIdentity.user);
    } else {
      // we do not have the identity; we must first try to find out if we have the same User already
      const existingUser = await this.findUser(login, context);
      if (existingUser) {
        const converted = await this.convertProfileIdentities(existingUser, login.identities, context);
        (await existingUser.identities).push(...converted);
        return existingUser;
      } else {
        // this is a completely new user
        return Promise.resolve(await this.createNewUser(login, context));
      }
    }
  }
}
