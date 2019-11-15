import { CustomerModel } from '../entities/customer.model';

export interface HasCustomer {
  customer: Promise<CustomerModel>;
}
