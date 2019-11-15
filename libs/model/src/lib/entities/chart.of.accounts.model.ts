import { BaseModel } from './base.model';
import { AccountModel } from './account.model';

export interface ChartOfAccountsModel extends BaseModel {
  salesIncomeAccount: Promise<AccountModel>
}
