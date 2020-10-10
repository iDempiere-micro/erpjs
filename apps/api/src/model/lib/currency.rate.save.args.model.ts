import { BaseSaveArgsModel } from './base.save.args.model';
import { CurrencyModel } from './currency.model';

export interface CurrencyRateSaveArgsModel extends BaseSaveArgsModel {
  from?: CurrencyModel; // EUR
  to?: CurrencyModel; // CZK
  fromIsoCode?: string; // EUR
  toIsoCode?: string; // CZK
  currencyMultiplyingRate: number; // 1 EUR = x CZK
  start: Date;
  end: Date;
}
