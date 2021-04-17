import { BaseEntityService } from './base.entity.service';
import { CustomerProductPriceModel } from './customer.product.price.model';
import { CustomerProductPriceSaveArgsModel } from './customer.product.price.save.args.model';
import { CustomerProductPrice } from '../generated/entities/CustomerProductPrice';
import { EntityManager } from 'typeorm';
import { UserModel } from './user.model';
import { Repository } from 'typeorm';

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
    entity.product = args.product;
    entity.sellingPrice = args.sellingPrice;
    entity.customerPriceList = args.customerPriceList;
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
