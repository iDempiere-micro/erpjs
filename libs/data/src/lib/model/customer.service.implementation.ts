import { Injectable } from '@nestjs/common';
import { CustomerSaveArgsModel, CustomerService, Injector } from '@erpjs/model';
import { Customer, ModelModule } from '@erpjs/data';
import { Address } from '../entities/address';
import { Country } from '../entities/country';

@Injectable()
export class CustomerServiceImplementation extends CustomerService {
  getInjector(): Injector {
    return ModelModule.getInjector();
  }
  async createAddress(): Promise<Address> {
    return new Address();
  }

  async createEntity(): Promise<Customer> {
    return new Customer();
  }

  async loadCountry(id: number): Promise<Country> {
    return await ModelModule.getEntityManager().getRepository(Country).findOne(id);
  }

  async loadEntity(id: number): Promise<Customer> {
    return await ModelModule.getEntityManager().getRepository(Customer).findOne(id);
  }

  async save(
    args: CustomerSaveArgsModel
  ): Promise<Customer> {
    const customer = await super.save(args);
    await ModelModule.getEntityManager().getRepository(Address).save(await customer.legalAddress);
    return await ModelModule.getEntityManager().getRepository(Customer).save(customer);
  }
}
