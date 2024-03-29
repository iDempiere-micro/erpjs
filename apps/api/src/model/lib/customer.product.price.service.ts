import { Inject } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { CustomerProductPrice } from '../generated/entities/CustomerProductPrice';
import { BaseEntityService } from './base.entity.service';
import { CurrencyService, CurrencyServiceKey } from './currency.service';
import {
  CustomerPriceListService,
  CustomerPriceListServiceKey,
} from './customer.price.list.service';
import { CustomerProductPriceModel } from './customer.product.price.model';
import { CustomerProductPriceSaveArgsModel } from './customer.product.price.save.args.model';
import { getService } from './module.reference.service';
import { ProductService, ProductServiceKey } from './product.service';

export const CustomerProductPriceServiceKey = 'CustomerProductPriceServiceKey';

export class CustomerProductPriceService extends BaseEntityService<
  CustomerProductPriceModel,
  CustomerProductPriceSaveArgsModel
> {
  constructor(
    @Inject(ProductServiceKey)
    protected readonly productService: ProductService,
    @Inject(CurrencyServiceKey)
    protected readonly currencyService: CurrencyService,
  ) {
    super();
  }

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
    entity.product = await this.productService.loadEntityById(
      transactionalEntityManager,
      args.productId,
    );
    entity.sellingPrice = args.sellingPrice;
    entity.customerPriceList = await customerPriceListService.loadEntityById(
      transactionalEntityManager,
      args.customerPriceListId,
    );
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
