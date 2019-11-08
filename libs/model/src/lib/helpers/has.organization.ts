import { OrganizationModel } from '@erpjs/model';

export interface HasOrganization {
  organization: Promise<OrganizationModel>
}
