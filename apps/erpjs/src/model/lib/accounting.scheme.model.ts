import { BaseModel } from './base.model';
import { CurrencyModel } from './currency.model';

export interface AccountingSchemeModel extends BaseModel {
  currency: CurrencyModel;
  displayName: string;
}
