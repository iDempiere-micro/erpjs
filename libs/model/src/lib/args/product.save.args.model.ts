import { BaseSaveArgsModel } from './base.save.args.model';
import { AccountModel } from '../entities/account.model';

export interface ProductSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  sku: string;
  sellingAccount?: AccountModel;
  sellingAccountCode?: string;
  buyingAccount?: AccountModel;
  buyingAccountCode?: string;
}
