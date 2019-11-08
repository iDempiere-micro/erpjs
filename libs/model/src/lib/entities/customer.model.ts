import { BaseModel } from './base.model';
import { CanHaveVatRegistration, HasLegalAddress, HasLegalName } from '../..';

export interface CustomerModel extends BaseModel, HasLegalAddress, HasLegalName,
CanHaveVatRegistration {
  invoicingEmail: string;
}
