import { UserModel } from './user.model';
import { OrganizationModel } from './organization.model';
import { BaseModel } from './base.model';

export interface UserToOrganizationModel extends BaseModel {
  user: UserModel;
  organization: OrganizationModel;
}
