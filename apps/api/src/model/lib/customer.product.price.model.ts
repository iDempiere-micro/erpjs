import { ProductModel } from './product.model';
import { BaseModel } from './base.model';
import { CustomerPriceListModel } from './customer.price.list.model';

export interface CustomerProductPriceModel extends BaseModel {
  product: ProductModel;
  sellingPrice: number;
  customerPriceList: CustomerPriceListModel;
}
