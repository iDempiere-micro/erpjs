import { BaseSaveArgsModel } from './base.save.args.model';
import { ProductModel } from './product.model';
import { CustomerPriceListModel } from './customer.price.list.model';

export interface CustomerProductPriceSaveArgsModel extends BaseSaveArgsModel {
  product?: ProductModel;
  productSKU?: string;
  sellingPrice: number;
  customerPriceList?: CustomerPriceListModel;
  customerPriceListDisplayName?: string;
}
