import { BaseSaveArgsModel } from './base.save.args.model';
import { CustomerGroupModel } from '../entities/customer.group.model';
import { ProductModel } from '../entities/product.model';

export interface ProductPrice {
  product?: ProductModel
  productSKU?: string
  sellingPrice: number
}


export interface CustomerPriceListSaveArgsModel extends BaseSaveArgsModel {
  displayName : string
  customerGroup?: CustomerGroupModel
  customerGroupDisplayName?: string
  productPrices: Array<ProductPrice>
  validFrom?: Date
  validTo?: Date
}
