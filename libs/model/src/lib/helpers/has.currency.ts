import { CurrencyModel } from '../entities/currency.model';

export interface HasCurrency {
  currency: Promise<CurrencyModel>;
}
