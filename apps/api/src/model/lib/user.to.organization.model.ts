import { BaseModel } from './base.model';
import { OrganizationModel } from './organization.model';
import { UserModel } from './user.model';

export interface UserToOrganizationModel extends BaseModel {
  user: UserModel;
  organization: OrganizationModel;
}
