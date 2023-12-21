import { BaseModel } from './base.model';
import { CustomerModel } from './customer.model';

export interface CustomerGroupModel extends BaseModel {
  displayName: string;
  customers: Array<CustomerModel>;
}
