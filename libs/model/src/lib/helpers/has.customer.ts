import { CustomerModel } from '../..';

export interface HasCustomer {
  customer: Promise<CustomerModel>;
}
