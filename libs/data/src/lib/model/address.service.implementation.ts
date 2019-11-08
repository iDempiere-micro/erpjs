import { AddressModel, AddressSaveArgsModel, AddressService, Injector } from '@erpjs/model';
import { Address } from '../entities/address';
import { ModelModule } from '@erpjs/data';

export class AddressServiceImplementation extends AddressService {
  async loadEntity(id: number): Promise<AddressModel> {
    return ModelModule.getEntityManager().getRepository(Address).findOne(id);
  }
  getInjector(): Injector {
    return ModelModule.getInjector();
  }
  async createEntity(): Promise<Address> {
    return new Address();
  }

  async save(newAddress: AddressSaveArgsModel): Promise<AddressModel> {
    return await ModelModule.getEntityManager().save(await super.save(newAddress));
  }
}
