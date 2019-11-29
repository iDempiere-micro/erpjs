import { BaseModel } from './base.model';
import { HasLegalName } from '../helpers/has.legal.name';
import { HasLegalAddress } from '../helpers/has.legal.address';
import { CanHaveVatRegistration } from '../helpers/can.have.vat.registration';

export interface VendorModel extends BaseModel, HasLegalAddress, HasLegalName,
  CanHaveVatRegistration {
  invoicingEmail: string;
}
