import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { CustomerGroup } from '../generated/entities/CustomerGroup';
import { BaseEntityService } from './base.entity.service';
import { CustomerGroupModel } from './customer.group.model';
import { CustomerGroupSaveArgsModel } from './customer.group.save.args.model';

export const CustomerGroupServiceKey = 'CustomerGroupService';

@Injectable()
export class CustomerGroupService extends BaseEntityService<
  CustomerGroupModel,
  CustomerGroupSaveArgsModel
> {
  loadEntityByIdRelations(): string[] {
    return ['customerPriceLists'];
  }

  createEntity(): CustomerGroupModel {
    return new CustomerGroup();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: CustomerGroupSaveArgsModel,
    entity: CustomerGroupModel,
  ): Promise<CustomerGroupModel> {
    entity.displayName = args.displayName;
    return entity;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<CustomerGroupModel> {
    return transactionalEntityManager.getRepository(
      CustomerGroup,
    ) as Repository<CustomerGroupModel>;
  }

  typeName(): string {
    return CustomerGroupServiceKey;
  }
}
