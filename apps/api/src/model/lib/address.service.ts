import { BaseEntityService } from './base.entity.service';
import { Inject, Injectable } from '@nestjs/common';
import { AddressModel } from './address.model';
import { AddressSaveArgsModel } from './address.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import * as deepEqual from 'deep-equal';
import { CountryService, CountryServiceKey } from './country.service';
import { Address } from './entity.base';

export const AddressServiceKey = 'AddressService';

@Injectable()
export class AddressService extends BaseEntityService<
  AddressModel,
  AddressSaveArgsModel
> {
  constructor(
    @Inject(CountryServiceKey) public readonly countryService: CountryService
  ) {
    super();
  }

  createEntity(): AddressModel {
    return new Address();
  }

  protected async doSave(
    transactionalEntityManager,
    newAddress: AddressSaveArgsModel
  ): Promise<AddressModel> {
    const oldAddress = newAddress.id
      ? await this.loadEntityById(transactionalEntityManager, newAddress.id)
      : null;

    const oldAddressSimple: AddressSaveArgsModel = {
      city: oldAddress ? oldAddress.city : '',
      line1: oldAddress ? oldAddress.line1 : '',
      zipCode: oldAddress ? oldAddress.zipCode : '',
      countryIsoCode: oldAddress ? oldAddress.country.isoCode : '',
    };

    if (!deepEqual(oldAddressSimple, newAddress)) {
      const address = await this.createEntity();
      address.line1 = newAddress.line1;
      address.zipCode = newAddress.zipCode;
      address.city = newAddress.city;

      if (newAddress.country) {
        address.country = newAddress.country;
      } else {
        address.country = await this.countryService.getCountry(
          transactionalEntityManager,
          newAddress.countryIsoCode
        );
      }

      // address.country = Promise.resolve(newAddress.country ? newAddress.country : await base.loadCountry(newAddress.countryId));
      return address;
    }

    return oldAddress;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager
  ): Repository<AddressModel> {
    return transactionalEntityManager.getRepository(Address);
  }

  typeName(): string {
    return AddressServiceKey;
  }
}
