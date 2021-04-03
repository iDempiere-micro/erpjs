import { BaseSaveArgsModel } from './base.save.args.model';
import { CountryModel } from './country.model';

export interface AddressSaveArgsModel extends BaseSaveArgsModel {
  city: string;
  line1: string;
  zipCode: string;
  countryIsoCode?: string;
  country?: CountryModel;
}
