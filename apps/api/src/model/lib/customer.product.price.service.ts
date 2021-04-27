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
import { ProductService, ProductServiceKey } from './product.service';
import { Inject } from '@nestjs/common';
import { CurrencyService, CurrencyServiceKey } from './currency.service';

export const CustomerProductPriceServiceKey = 'CustomerProductPriceServiceKey';

export class CustomerProductPriceService extends BaseEntityService<
  CustomerProductPriceModel,
  CustomerProductPriceSaveArgsModel
> {
  constructor(
    @Inject(ProductServiceKey)
    protected readonly productService: ProductService,
    @Inject(CustomerPriceListServiceKey)
    protected readonly customerPriceListService: CustomerPriceListService,
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
    entity.customerPriceList = await this.customerPriceListService.loadEntityById(
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
