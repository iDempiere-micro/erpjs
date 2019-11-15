import { BaseModel } from './base.model';
import { AccountingSchemeModel } from './accounting.scheme.model';

export interface AccountModel extends BaseModel {
  accountingScheme: Promise<AccountingSchemeModel>;
}
