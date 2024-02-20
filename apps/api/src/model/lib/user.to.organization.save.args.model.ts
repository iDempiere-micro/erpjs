import { BaseSaveArgsModel } from './base.save.args.model';
import { OrganizationModel } from './organization.model';
import { UserModel } from './user.model';

export interface UserToOrganizationSaveArgsModel extends BaseSaveArgsModel {
  user: UserModel;
  organization: OrganizationModel;
}
