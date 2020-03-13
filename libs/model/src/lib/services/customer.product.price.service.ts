import { BaseEntityServiceImplementation } from './base.entity.service';
import { CustomerProductPriceModel } from '../entities/customer.product.price.model';
import { CustomerProductPriceSaveArgsModel } from '../args/customer.product.price.save.args.model';

export const CustomerProductPriceServiceKey = 'CustomerProductPriceService';

export class CustomerProductPriceService extends
  BaseEntityServiceImplementation<CustomerProductPriceModel, CustomerProductPriceSaveArgsModel> {
  protected async doSave(args: CustomerProductPriceSaveArgsModel, entity: CustomerProductPriceModel): Promise<CustomerProductPriceModel> {
    entity.product = Promise.resolve(args.product);
    entity.sellingPrice = args.sellingPrice;
    entity.customerPriceList = Promise.resolve(args.customerPriceList);
    return entity;
  }

  typeName(): string {
    return CustomerProductPriceServiceKey;
  }

}
