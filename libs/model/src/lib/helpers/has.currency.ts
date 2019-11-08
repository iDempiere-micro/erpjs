import { CurrencyModel } from '../..';

export interface HasCurrency {
  currency: Promise<CurrencyModel>;
}
