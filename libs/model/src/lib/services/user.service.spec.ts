import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserModel } from '../entities/user.model';
import { UserProfileModelIdentity } from '../helpers/user.profile.model.identity';
import { UserIdentityModel } from '../entities/user.identity.model';
import { UserProfileModel } from '../helpers/user.profile.model';
import { UserIdentity } from '../../../../data/src/lib/entities/user.identity';

class DummyUserService extends UserService {
  currentUser: UserModel = null;
  users: UserModel[];

  constructor() {
    super();

    this.getCurrentUser = () => this.currentUser;
    this.findUserByEmail = async (email) => undefined;
    this.findUserIdentity = async (userProfileIdentities) => this.findUserIdentity1(userProfileIdentities);
    this.findUser = async (userProfileModel) => undefined;
    this.convertProfileIdentities
      = async (user1, userProfileIdentities) => undefined;
    this.createNewUser = async (userProfileModel) => undefined;
  }

  async findUserIdentity1(userProfileIdentities: Array<UserProfileModelIdentity>): Promise<UserIdentity> {
    for (const x of this.users) {
      const instance = (await x.identities)[0];
      if (instance.externalUser === userProfileIdentities[0].user_id ) {
        return {...instance, updtTs: null, updtOpId: null, isActive: true, isCurrent: true};
      }
    }
    return null;
  }
  setCurrentUser(currentUser: UserModel) {
    this.currentUser = currentUser;
  }
}

const user : UserModel = {
  id:0, displayName: 'John', identities: Promise.resolve([]), organizations: Promise.resolve([]),
};
const userIdentityModel: UserIdentityModel = {id: 0, externalUser: '12345', provider: 'hu', user:Promise.resolve(user), displayName: 'aaa'};
user.identities = Promise.resolve([userIdentityModel]);

const user2 : UserModel = {
  id:1, displayName: 'James', identities: Promise.resolve([]), organizations: Promise.resolve([]),
};
const userIdentityModel2: UserIdentityModel = {id: 1, externalUser: '6789', provider: 'hu', user:Promise.resolve(user2), displayName: 'bbb'};
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
        null
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
        userProfile
      );
      expect(userFound).toBe(user);
    });

  })
});
