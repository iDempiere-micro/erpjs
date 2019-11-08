import { CountryModel } from './country.model';
import { BaseModel } from './base.model';
import { OrganizationModel } from './organization.model';

export interface VatRegistrationModel extends BaseModel {
  vatNumber: string;
  registeredIn: Promise<CountryModel>;
  start: Date,
  end?: Date;
  registeredFor: Promise<OrganizationModel>;
}
