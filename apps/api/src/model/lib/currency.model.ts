import { BaseModel } from './base.model';

export interface CurrencyModel extends BaseModel {
  isoCode: string;
  displayName: string;
}
