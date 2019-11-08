import { BaseModel } from './base.model';
import { AccountingSchemeModel } from '../..';

export interface AccountModel extends BaseModel {
  accountingScheme: Promise<AccountingSchemeModel>;
}
