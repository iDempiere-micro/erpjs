import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import {
  AddressModel,
  AddressSaveArgsModel,
  AddressService,
} from '../../model';
import { CustomAddress, HasNote } from './custom.address';

@Injectable()
export class CustomAddressService extends AddressService {
  createEntity(): AddressModel {
    const result = new CustomAddress();
    result.note = 'this is a note';
    return result;
  }

  protected async doSave(
    transactionalEntityManager,
    newAddress: AddressSaveArgsModel,
  ): Promise<AddressModel> {
    return {
      note: 'this is a note',
      ...(await super.doSave(transactionalEntityManager, newAddress)),
    } as HasNote & AddressModel;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<AddressModel> {
    return transactionalEntityManager.getRepository(
      CustomAddress,
    ) as Repository<AddressModel>;
  }
}
