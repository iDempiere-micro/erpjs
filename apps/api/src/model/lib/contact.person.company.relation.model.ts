import { BaseModel } from './base.model';
import { CustomerModel } from './customer.model';
import { ContactPersonModel } from './contact.person.model';

export interface ContactPersonCompanyRelationModel extends BaseModel {
  role: string;
  customer: CustomerModel;
  contactPerson: ContactPersonModel;
  isActive: boolean;
}
