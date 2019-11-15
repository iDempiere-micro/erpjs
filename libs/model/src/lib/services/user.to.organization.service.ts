import { UserToOrganizationSaveArgsModel } from '../args/user.to.organization.save.args.model';
import { BaseEntityServiceImplementation } from './base.entity.service';
import { UserToOrganizationModel } from '../entities/user.to.organization.model';

export const UserToOrganizationServiceKey = 'UserToOrganizationService';

export class UserToOrganizationService extends BaseEntityServiceImplementation<UserToOrganizationModel, UserToOrganizationSaveArgsModel> {
  protected async doSave(args: UserToOrganizationSaveArgsModel, UserToOrganization: UserToOrganizationModel): Promise<UserToOrganizationModel> {
    UserToOrganization.organization = Promise.resolve(args.organization);
    UserToOrganization.user = Promise.resolve(args.user);
    return  UserToOrganization;
  }

  typeName(): string {
    return UserToOrganizationServiceKey;
  }
}
