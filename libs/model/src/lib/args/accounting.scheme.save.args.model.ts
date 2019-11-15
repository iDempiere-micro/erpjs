import { BaseSaveArgsModel } from './base.save.args.model';
import { CurrencyModel } from '../entities/currency.model';

export interface AccountingSchemeSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  currency?: CurrencyModel;
  currencyIsoCode?: string;
}
