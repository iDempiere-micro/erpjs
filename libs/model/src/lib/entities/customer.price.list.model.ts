import { BaseModel } from './base.model';
import { CustomerProductPriceModel } from './customer.product.price.model';
import { CustomerGroupModel } from './customer.group.model';

export interface CustomerPriceListModel extends BaseModel {
  customerGroup: Promise<CustomerGroupModel>
  productPrices: Promise<Array<CustomerProductPriceModel>>
  validFrom?: Date
  validTo?: Date
}
