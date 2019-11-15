import { BaseEntityServiceImplementation } from './base.entity.service';
import { CustomerModel } from '../entities/customer.model';
import { CustomerSaveArgsModel } from '../args/customer.save.args.model';

export const CustomerServiceKey = 'CustomerService';

export class CustomerService extends BaseEntityServiceImplementation<CustomerModel, CustomerSaveArgsModel> {
  protected async doSave(args: CustomerSaveArgsModel, customer: CustomerModel): Promise<CustomerModel> {
    const address = await this.getInjector().addressService.save(args.legalAddress);

    customer.displayName = args.displayName;
    customer.vatNumber = args.vatNumber;
    customer.legalName = args.legalName;
    customer.invoicingEmail = args.invoicingEmail;
    customer.legalAddress = Promise.resolve(address);
    return customer;
  }

  typeName(): string {
    return CustomerServiceKey;
  }

}
