import { BaseModel } from './base.model';
import { UserModel } from './user.model';

export interface UserIdentityModel extends BaseModel {
  externalUser: string;
  provider: string;
  user: UserModel;
}
