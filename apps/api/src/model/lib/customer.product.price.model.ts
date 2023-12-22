import { ProductModel } from './product.model';
import { BaseModel } from './base.model';
import { CustomerPriceListModel } from './customer.price.list.model';
import { CurrencyModel } from './currency.model';

export interface CustomerProductPriceModel extends BaseModel {
  product: ProductModel;
  sellingPrice: number;
  customerPriceList: CustomerPriceListModel;
  currency: CurrencyModel;
}
