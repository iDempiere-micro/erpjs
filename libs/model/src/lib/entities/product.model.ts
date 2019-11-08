import { BaseModel } from './base.model';
import { AccountModel } from './account.model';

export interface ProductModel extends BaseModel {
  sku: string;
  sellingAccount?: Promise<AccountModel>;
  buyingAccount?: Promise<AccountModel>;
}
