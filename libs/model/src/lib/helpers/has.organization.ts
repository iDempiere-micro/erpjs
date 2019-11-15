import { OrganizationModel } from '../entities/organization.model';

export interface HasOrganization {
  organization: Promise<OrganizationModel>
}
