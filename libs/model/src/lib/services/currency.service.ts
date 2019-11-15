import { BaseEntityServiceImplementation } from './base.entity.service';
import { CurrencyModel } from '../entities/currency.model';
import { CurrencySaveArgsModel } from '../args/currency.save.args.model';

export const CurrencyServiceKey = 'CurrencyService';

export class CurrencyService extends BaseEntityServiceImplementation<CurrencyModel, CurrencySaveArgsModel> {
  getCurrency: (isoCode: string) => Promise<CurrencyModel>;
  protected async doSave(args: CurrencySaveArgsModel, currency: CurrencyModel): Promise<CurrencyModel> {
    currency.displayName = args.displayName;
    currency.isoCode = args.isoCode;
    return currency;
  }

  typeName(): string {
    return CurrencyServiceKey;
  }
}
