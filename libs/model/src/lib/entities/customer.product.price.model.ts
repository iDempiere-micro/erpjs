import { ProductModel } from './product.model';
import { BaseModel } from './base.model';
import { CustomerPriceListModel } from './customer.price.list.model';

export interface CustomerProductPriceModel extends BaseModel {
  product: Promise<ProductModel>
  sellingPrice: number
  customerPriceList: Promise<CustomerPriceListModel>
}
