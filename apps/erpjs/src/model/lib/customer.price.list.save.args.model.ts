import { BaseSaveArgsModel } from './base.save.args.model';
import { CustomerGroupModel } from './customer.group.model';

export interface ProductPrice {
  productId: number;
  currencyId: number;
  sellingPrice: number;
}

export interface CustomerPriceListSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  customerGroup?: CustomerGroupModel;
  customerGroupDisplayName?: string;
  productPrices: Array<ProductPrice>;
  validFrom?: Date;
  validTo?: Date;
}
