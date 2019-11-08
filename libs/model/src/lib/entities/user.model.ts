import { BaseModel } from './base.model';
import { UserIdentityModel } from './user.identity.model';
import { UserToOrganizationModel } from './user.to.organization.model';

export interface UserModel<T extends UserModel<any>> extends BaseModel {
  identities: Promise<Array<UserIdentityModel<T>>>;
  organizations: Promise<Array<UserToOrganizationModel>>;
}
