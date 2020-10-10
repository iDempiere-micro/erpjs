import { BaseModel } from './base.model';
import { AddressModel } from './address.model';

export interface CustomerModel extends BaseModel {
  legalAddress: AddressModel;
  legalName: string;
  vatNumber?: string;

  invoicingEmail: string;
  idNumber: string;
  displayName: string;
}
