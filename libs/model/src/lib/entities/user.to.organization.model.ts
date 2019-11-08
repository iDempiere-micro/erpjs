import { OrganizationModel, UserModel } from '@erpjs/model';

export interface UserToOrganizationModel {
    user: Promise<UserModel<any>>;
    organization: Promise<OrganizationModel>;
}
