import { BaseEntityServiceImplementation } from './base.entity.service';
import { CountryModel } from '../entities/country.model';
import { CountrySaveArgsModel } from '../args/country.save.args.model';

export const CountryServiceKey = 'CountryService';

export class CountryService extends BaseEntityServiceImplementation<CountryModel, CountrySaveArgsModel> {
  getCountry: (isoCode: string) => Promise<CountryModel>;

  protected async doSave(args: CountrySaveArgsModel, country: CountryModel): Promise<CountryModel> {
    country.displayName = args.displayName;
    country.isoCode = args.isoCode;
    return country;
  }

  typeName(): string {
    return CountryServiceKey;
  }
}
