import { BaseModel } from './base.model';
import { AddressModel } from './address.model';
import { AccountingSchemeModel } from './accounting.scheme.model';
import { BankAccountModel } from './bank.account.model';

export interface OrganizationModel extends BaseModel {
  displayName: string;
  legalAddress: AddressModel;
  legalName: string;
  registration: string;
  contact: string;
  idNumber: string;
  vatNumber?: string;
  accountingScheme: AccountingSchemeModel;
  bankAccount: BankAccountModel;
}
