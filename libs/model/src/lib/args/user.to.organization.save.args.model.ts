import { BaseSaveArgsModel } from './base.save.args.model';
import { UserModel } from '../entities/user.model';
import { OrganizationModel } from '../entities/organization.model';

export interface UserToOrganizationSaveArgsModel extends BaseSaveArgsModel {
  user: UserModel;
  organization: OrganizationModel;
}
