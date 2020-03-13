import { BaseEntityServiceImplementation } from './base.entity.service';
import { CustomerGroupModel } from '../entities/customer.group.model';
import { CustomerGroupSaveArgsModel } from '../args/customer.group.save.args.model';
import { CustomerModel } from '../entities/customer.model';

export const CustomerGroupServiceKey = 'CustomerGroupService';

export class CustomerGroupService extends BaseEntityServiceImplementation<CustomerGroupModel,CustomerGroupSaveArgsModel>  {
  saveCustomers: (entity: CustomerGroupModel, customers: Array<CustomerModel>) => Promise<CustomerGroupModel>;
  loadCustomerGroup: (string) => Promise<CustomerGroupModel>;
  findCustomerGroup: (customer: CustomerModel) => Promise<CustomerGroupModel>;

  protected async doSave(args: CustomerGroupSaveArgsModel, entity: CustomerGroupModel): Promise<CustomerGroupModel> {
    entity.displayName = args.displayName;
    return entity;
  }

  typeName(): string {
    return CustomerGroupServiceKey;
  }

}
