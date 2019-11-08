import { BaseService } from './base.service';
import { BaseEntityService } from './base.entity.service';
import { AddressModel, AddressSaveArgsModel } from '../..';

const  deepEqual = require('deep-equal');

export abstract class AddressService extends BaseService implements BaseEntityService<AddressModel, AddressSaveArgsModel> {
  abstract async createEntity(): Promise<AddressModel>;
  abstract async loadEntity(id: number): Promise<AddressModel>;

  async save(newAddress: AddressSaveArgsModel): Promise<AddressModel> {
    const oldAddress = newAddress.id ? await this.loadEntity(newAddress.id) : null;

    const oldAddressSimple: AddressSaveArgsModel = {
      city: oldAddress ? oldAddress.city : '',
      line1: oldAddress ? oldAddress.line1 : '',
      zipCode: oldAddress ? oldAddress.zipCode : '',
      countryId: oldAddress ? (await oldAddress.country).id : -1
    };

    if (!deepEqual(oldAddressSimple, newAddress)) {
      const address = await this.createEntity();
      address.line1 = newAddress.line1;
      address.zipCode = newAddress.zipCode;
      address.city = newAddress.city;
      address.country = Promise.resolve(await this.loadCountry(newAddress.countryId));
      return address;
    }

    return oldAddress;
  }
}
