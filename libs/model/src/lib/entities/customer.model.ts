import { BaseModel } from './base.model';
import { HasLegalAddress } from '../helpers/has.legal.address';
import { HasLegalName } from '../helpers/has.legal.name';
import { CanHaveVatRegistration } from '../helpers/can.have.vat.registration';

export interface CustomerModel extends BaseModel, HasLegalAddress, HasLegalName,
CanHaveVatRegistration {
  invoicingEmail: string;
}
