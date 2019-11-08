import { BaseEntityService } from './base.entity.service';
import { CurrencyModel, CurrencySaveArgsModel } from '../..';

export abstract class CurrencyService
  implements BaseEntityService<CurrencyModel, CurrencySaveArgsModel>
{
  async abstract createEntity(): Promise<CurrencyModel>;

  async abstract loadEntity(id: number): Promise<CurrencyModel>;

  async save(args: CurrencySaveArgsModel): Promise<CurrencyModel> {
    const Currency =
      args.id ? await this.loadEntity(args.id) : await this.createEntity();
    Currency.displayName =  args.displayName;
    Currency.isoCode = args.isoCode;
    return Currency;
  }
}
