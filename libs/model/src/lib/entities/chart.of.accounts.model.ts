import { AccountModel, BaseModel } from '@erpjs/model';

export interface ChartOfAccountsModel extends BaseModel {
  salesIncomeAccount: Promise<AccountModel>
}
