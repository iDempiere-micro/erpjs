import { BaseModel } from './base.model';
import { CurrencyModel } from './currency.model';
import { CustomerPriceListModel } from './customer.price.list.model';
import { ProductModel } from './product.model';

export interface CustomerProductPriceModel extends BaseModel {
  product: ProductModel;
  sellingPrice: number;
  customerPriceList: CustomerPriceListModel;
  currency: CurrencyModel;
}
