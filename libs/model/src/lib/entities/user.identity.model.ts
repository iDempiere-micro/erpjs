import { BaseModel } from './base.model';
import { UserModel } from './user.model';

export interface UserIdentityModel<T  extends UserModel<any>> extends BaseModel {
  externalUser: string;
  provider: string;
  user: Promise<T>;
}
