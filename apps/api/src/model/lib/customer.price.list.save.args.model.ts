import { BaseSaveArgsModel } from './base.save.args.model';
import { ProductModel } from './product.model';
import { CustomerGroupModel } from './customer.group.model';

export interface ProductPrice {
  product?: ProductModel;
  productSKU?: string;
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
