import { BaseEntityServiceImplementation } from './base.entity.service';
import { CurrencyRateModel } from '../entities/currency.rate.model';
import { CurrencyRateSaveArgsModel } from '../args/currency.rate.save.args.model';
import { CurrencyModel } from '../entities/currency.model';
import { OrganizationModel } from '../entities/organization.model';

export const CurrencyRateServiceKey = 'CurrencyRateService';

export class CurrencyRateService extends BaseEntityServiceImplementation<CurrencyRateModel, CurrencyRateSaveArgsModel>  {
  getAccountingForDateAndOrg: (transactionDate: Date, from: CurrencyModel, org: OrganizationModel) => Promise<CurrencyRateModel>;

  protected async doSave(args: CurrencyRateSaveArgsModel, entity: CurrencyRateModel): Promise<CurrencyRateModel> {
    const currencyService = this.getInjector().currencyService;
    entity.currencyMultiplyingRate = args.currencyMultiplyingRate;
    entity.end = args.end;
    entity.start = args.start;
    entity.from = Promise.resolve(
      args.from ? args.from: await currencyService.getCurrency(args.fromIsoCode)
    );
    entity.to = Promise.resolve(
      args.to ? args.to: await currencyService.getCurrency(args.toIsoCode)
    );
    return entity;
  }

  typeName(): string {
    return CurrencyRateServiceKey;
  }

}
