import { BaseModel } from './base.model';
import { FactoringProviderModel } from './factoring.provider.model';
import { CustomerModel } from './customer.model';
import { OrganizationModel } from './organization.model';

export interface FactoringContractModel extends BaseModel {
  isActive: boolean;
  factoringProvider: FactoringProviderModel;
  customer: CustomerModel;
  organization: OrganizationModel;
  invoicePrintNote: string;
}
