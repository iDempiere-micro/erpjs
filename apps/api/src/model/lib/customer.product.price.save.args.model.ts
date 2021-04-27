import { BaseSaveArgsModel } from './base.save.args.model';
import { CustomerPriceListModel } from './customer.price.list.model';

export interface CustomerProductPriceSaveArgsModel extends BaseSaveArgsModel {
  productId: number;
  sellingPrice: number;
  customerPriceListId?: number;
  customerPriceList?: CustomerPriceListModel;
  currencyId: number;
}
