import { BaseSaveArgsModel } from './base.save.args.model';
import { UserModel } from './user.model';
import { OrganizationModel } from './organization.model';

export interface UserToOrganizationSaveArgsModel extends BaseSaveArgsModel {
  user: UserModel;
  organization: OrganizationModel;
}
