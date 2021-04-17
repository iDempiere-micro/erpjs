import { BaseModel } from './base.model';
import { CustomerGroupModel } from './customer.group.model';
import { CustomerProductPriceModel } from './customer.product.price.model';

export interface CustomerPriceListModel extends BaseModel {
  displayName: string;
  customerGroup: CustomerGroupModel;
  productPrices: Array<CustomerProductPriceModel>;
  validFrom?: Date;
  validTo?: Date;
}
