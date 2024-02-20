import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { CustomerPriceList } from '../generated/entities/CustomerPriceList';
import { BaseEntityService } from './base.entity.service';
import { CustomerGroupModel } from './customer.group.model';
import {
  CustomerGroupService,
  CustomerGroupServiceKey,
} from './customer.group.service';
import { CustomerPriceListModel } from './customer.price.list.model';
import { CustomerPriceListSaveArgsModel } from './customer.price.list.save.args.model';
import {
  CustomerProductPriceService,
  CustomerProductPriceServiceKey,
} from './customer.product.price.service';
import { getService } from './module.reference.service';
import { ProductModel } from './product.model';
import { UserModel } from './user.model';

export const CustomerPriceListServiceKey = 'CustomerPriceListService';

@Injectable()
export class CustomerPriceListService extends BaseEntityService<
  CustomerPriceListModel,
  CustomerPriceListSaveArgsModel
> {
  createEntity(): CustomerPriceListModel {
    return new CustomerPriceList();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: CustomerPriceListSaveArgsModel,
    entity: CustomerPriceListModel,
    currentUser: UserModel,
  ): Promise<CustomerPriceListModel> {
    const customerGroupService: CustomerGroupService = getService(
      CustomerGroupServiceKey,
    );
    const customerProductPriceService: CustomerProductPriceService = getService(
      CustomerProductPriceServiceKey,
    );

    entity.customerGroup = args.customerGroup
      ? args.customerGroup
      : await customerGroupService.loadEntity(transactionalEntityManager, {
          where: { displayName: args.customerGroupDisplayName },
        });
    entity.validFrom = args.validFrom;
    entity.validTo = args.validTo;
    entity.displayName = args.displayName;

    await this.persist(transactionalEntityManager, entity, currentUser);

    entity.productPrices = [];
    for (const productPrice of args.productPrices) {
      entity.productPrices.push(
        await customerProductPriceService.save(
          transactionalEntityManager,
          {
            sellingPrice: productPrice.sellingPrice,
            productId: productPrice.productId,
            customerPriceList: entity,
            currencyId: productPrice.currencyId,
          },
          currentUser,
        ),
      );
    }

    return entity;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<CustomerPriceListModel> {
    return transactionalEntityManager.getRepository(CustomerPriceList);
  }

  typeName(): string {
    return CustomerPriceListServiceKey;
  }

  async loadDateValidByCustomerGroupAndProduct(
    transactionalEntityManager: EntityManager,
    customerGroup: CustomerGroupModel,
    product: ProductModel,
  ): Promise<CustomerPriceListModel[]> {
    const productId = product.id;
    const customerGroupId = customerGroup.id;
    return await this.getRepository(transactionalEntityManager)
      .createQueryBuilder('customerPriceList')
      .leftJoinAndSelect('customerPriceList.customerGroup', 'customerGroup')
      .leftJoinAndSelect(
        'customerPriceList.productPrices',
        'customerProductPriceModel',
      )
      .leftJoinAndSelect('customerProductPriceModel.product', 'product')
      .where(
        'product.id=:productId AND customerGroup.id=:customerGroupId AND ' +
          ' ( now() > customerPriceList.validFrom OR customerPriceList.validFrom IS NULL )' +
          ' ( now() < customerPriceList.validTo customerPriceList.validTo IS NULL )',
        {
          productId,
          customerGroupId,
        },
      )
      .orderBy('customerPriceList.validFrom', 'DESC')
      .getMany();
  }
}
