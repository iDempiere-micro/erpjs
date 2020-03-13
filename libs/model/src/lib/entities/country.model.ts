import { BaseModel } from './base.model';
import { HasIsoCode } from '../helpers/has.isoCode';

export interface CountryModel extends BaseModel, HasIsoCode {
  isEUMember: boolean;
}
