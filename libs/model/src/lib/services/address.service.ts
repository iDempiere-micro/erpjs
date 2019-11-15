import { BaseEntityServiceImplementation } from './base.entity.service';
import { AddressModel } from '../entities/address.model';
import { AddressSaveArgsModel } from '../args/address.save.args.model';

const  deepEqual = require('deep-equal');

export const AddressServiceKey = 'AddressService';

export class AddressService extends BaseEntityServiceImplementation<AddressModel, AddressSaveArgsModel> {
  protected async doSave(newAddress: AddressSaveArgsModel): Promise<AddressModel> {
    const oldAddress = newAddress.id ? await this.loadEntity(newAddress.id) : null;

    const oldAddressSimple: AddressSaveArgsModel = {
      city: oldAddress ? oldAddress.city : '',
      line1: oldAddress ? oldAddress.line1 : '',
      zipCode: oldAddress ? oldAddress.zipCode : '',
      countryIsoCode: oldAddress ? (await oldAddress.country).isoCode : ''
    };

    if (!deepEqual(oldAddressSimple, newAddress)) {
      const address = await this.createEntity();
      address.line1 = newAddress.line1;
      address.zipCode = newAddress.zipCode;
      address.city = newAddress.city;

      if (newAddress.country) {
        address.country = Promise.resolve(newAddress.country);
      } else {
        const country = await this.loadCountryByIsoCode(newAddress.countryIsoCode);
        address.country = Promise.resolve(country);
      }

      // address.country = Promise.resolve(newAddress.country ? newAddress.country : await base.loadCountry(newAddress.countryId));
      return address;
    }

    return oldAddress;
  }

  typeName(): string {
    return AddressServiceKey;
  }

}
