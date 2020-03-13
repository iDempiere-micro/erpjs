import { BaseSaveArgsModel } from './base.save.args.model';
import { ProductModel } from '../entities/product.model';
import { CustomerPriceListModel } from '../entities/customer.price.list.model';

export interface CustomerProductPriceSaveArgsModel extends BaseSaveArgsModel {
  product?: ProductModel
  productSKU?: string
  sellingPrice: number
  customerPriceList: CustomerPriceListModel
}
