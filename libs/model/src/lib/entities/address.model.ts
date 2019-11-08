import { BaseModel } from '../..';
import { CountryModel } from './country.model';

export interface AddressModel extends BaseModel {
  city: string;
  line1: string;
  zipCode: string;
  country: Promise<CountryModel>;
}
