import { UserIdentityModel, UserModel, UserProfileModel, UserProfileModelIdentity, UserService } from '@erpjs/model';
import { Test } from '@nestjs/testing';

class DummyUserService extends UserService<UserModel, any> {
  currentUser: UserModel = null;
  users: UserModel[];

  convertProfileIdentities(userProfileIdentities: Array<UserProfileModelIdentity>, context: any): Promise<Array<UserIdentityModel<UserModel>>> {
    return undefined;
  }

  createNewUser(userProfileModel: UserProfileModel, context: any): Promise<UserModel> {
    return undefined;
  }

  findUser(userProfileModel: UserProfileModel, context: any): Promise<UserModel> {
    return undefined;
  }

  async findUserIdentity(userProfileIdentities: Array<UserProfileModelIdentity>, context: any):Promise<UserIdentityModel<any>> {
    for (const x of this.users) {
      const instance = (await x.identities)[0];
      if (instance.externalUser === userProfileIdentities[0].user_id ) {
        return instance;
      }
    }
    return null;
  }

  getCurrentUser(): UserModel {
    return this.currentUser;
  }
  setCurrentUser(currentUser: UserModel) {
    this.currentUser = currentUser;
  }
}

const user : UserModel = {
  id:0, displayName: 'John', identities: Promise.resolve([]), organizations: Promise.resolve([]),
};
const userIdentityModel: UserIdentityModel<any> = {id: 0, externalUser: '12345', provider: 'hu', user:Promise.resolve(user), displayName: 'aaa'};
user.identities = Promise.resolve([userIdentityModel]);

const user2 : UserModel = {
  id:1, displayName: 'James', identities: Promise.resolve([]), organizations: Promise.resolve([]),
};
const userIdentityModel2: UserIdentityModel<any> = {id: 1, externalUser: '6789', provider: 'hu', user:Promise.resolve(user2), displayName: 'bbb'};
user2.identities = Promise.resolve([userIdentityModel2]);

const users = [user2, user];

describe('UserService', () => {
  let service: DummyUserService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [DummyUserService]
    }).compile();

    service = app.get<DummyUserService>(DummyUserService);
    service.users = users;
  });

  describe('UserService', () => {

    it('works for null', async () => {
      await service.handleLogin(
        null, null,
      );
    });

    const userProfile : UserProfileModel = {
      email: 'a@b.c',
      identities: [
        {user_id: '12345', provider: 'hu'}
      ],
      user_id: '12345',
      name: 'john',
    };

    it('works for more complex case', async () => {

      const userFound = await service.handleLogin(
        userProfile, null,
      );
      expect(userFound).toBe(user);
    });

  })
});
