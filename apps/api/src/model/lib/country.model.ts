import { BaseModel } from './base.model';

export interface CountryModel extends BaseModel {
  displayName: string;
  isEUMember: boolean;
  isoCode: string;
}
