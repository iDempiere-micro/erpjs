import { Implement } from './base.service.implementation';
import { CustomerGroupModel, CustomerGroupService, CustomerModel } from '@erpjs/model';
import { Customer } from '@erpjs/data';

const { forEach } = require('p-iteration');

export class CustomerGroupServiceImplementation
  extends Implement(CustomerGroupService)
{
  constructor() {
    super();
    this.saveCustomers = async (entity: CustomerGroupModel, customers: Array<CustomerModel>) => {
      const {customerService} = this.getInjector();
      const savedCustomers = [];
      forEach(customers, async (x: CustomerModel) =>
        {
          const customer : Customer = await customerService.loadEntity(x.id) as Customer;
          customer.customerGroup = Promise.resolve(entity);
          await customerService.persist(customer);
          savedCustomers.push(customer);
        }
      );
      entity.customers = Promise.resolve(savedCustomers);

      return Promise.resolve(entity)
    };
    this.findCustomerGroup = async (customer: CustomerModel) => {
      const {customerService} = this.getInjector();
      // TODO: fix this leaking abstraction here... or not?
      const customerLoaded : Customer = await customerService.loadEntity(customer.id) as Customer;
      return await customerLoaded.customerGroup;
    }
  }
}
