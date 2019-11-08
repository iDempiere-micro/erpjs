import { BaseEntityService } from './base.entity.service';
import { CountryModel, CountrySaveArgsModel } from '../..';

export abstract class CountryService
  implements BaseEntityService<CountryModel, CountrySaveArgsModel>
{
  async abstract createEntity(): Promise<CountryModel>;

  async abstract loadEntity(id: number): Promise<CountryModel>;

  async save(args: CountrySaveArgsModel): Promise<CountryModel> {
    const country =
      args.id ? await this.loadEntity(args.id) : await this.createEntity();
    country.displayName =  args.displayName;
    country.isoCode = args.isoCode;
    return country;
  }
}
