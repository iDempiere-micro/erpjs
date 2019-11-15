import { BaseModel } from './base.model';
import { UserIdentityModel } from './user.identity.model';
import { UserToOrganizationModel } from './user.to.organization.model';

export interface UserModel extends BaseModel {
  identities: Promise<Array<UserIdentityModel>>;
  organizations: Promise<Array<UserToOrganizationModel>>;
}
