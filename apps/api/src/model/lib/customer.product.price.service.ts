import { BaseEntityService } from './base.entity.service';
import { CustomerProductPriceModel } from './customer.product.price.model';
import { CustomerProductPriceSaveArgsModel } from './customer.product.price.save.args.model';
import { CustomerProductPrice } from '../generated/entities/CustomerProductPrice';
import { EntityManager } from 'typeorm';
import { Repository } from 'typeorm';
import { getService } from './module.reference.service';
import {
  CustomerPriceListService,
  CustomerPriceListServiceKey,
} from './customer.price.list.service';

export const CustomerProductPriceServiceKey = 'CustomerProductPriceServiceKey';

export class CustomerProductPriceService extends BaseEntityService<
  CustomerProductPriceModel,
  CustomerProductPriceSaveArgsModel
> {
  createEntity(): CustomerProductPriceModel {
    return new CustomerProductPrice();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: CustomerProductPriceSaveArgsModel,
    entity: CustomerProductPriceModel,
  ): Promise<CustomerProductPriceModel> {
    const customerPriceListService: CustomerPriceListService = getService(
      CustomerPriceListServiceKey,
    );
    entity.product = args.product;
    entity.sellingPrice = args.sellingPrice;
    entity.customerPriceList =
      args.customerPriceList ||
      (await customerPriceListService.loadEntity(transactionalEntityManager, {
        where: { displayName: args.customerPriceListDisplayName },
      }));
    return entity;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<CustomerProductPriceModel> {
    return transactionalEntityManager.getRepository(CustomerProductPrice);
  }

  typeName(): string {
    return CustomerProductPriceServiceKey;
  }
}
