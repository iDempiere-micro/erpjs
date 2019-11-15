import { CountryModel } from './country.model';
import { BaseModel } from './base.model';

export interface AddressModel extends BaseModel {
  city: string;
  line1: string;
  zipCode: string;
  country: Promise<CountryModel>;
}
