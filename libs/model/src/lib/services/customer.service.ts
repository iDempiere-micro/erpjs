import { BaseService, CustomerModel, CustomerSaveArgsModel } from '../..';
import { BaseEntityService } from './base.entity.service';

export abstract class CustomerService extends BaseService
  implements BaseEntityService<CustomerModel, CustomerSaveArgsModel> {
  abstract createEntity(): Promise<CustomerModel>;
  abstract loadEntity(id: number): Promise<CustomerModel>;

  async save(
    args: CustomerSaveArgsModel,
  ): Promise<CustomerModel> {
    const customer =
      args.id ? await this.loadEntity(args.id) : await this.createEntity();

    customer.displayName = args.displayName;
    customer.vatNumber = args.vatNumber;
    customer.legalName = args.legalName;
    customer.invoicingEmail = args.invoicingEmail;
    customer.legalAddress = this.getInjector().addressService.save(args.legalAddress);
    return customer;
  }
}
