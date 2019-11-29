import { BaseModel } from './base.model';
import { HasLegalAddress } from '../helpers/has.legal.address';
import { HasLegalName } from '../helpers/has.legal.name';
import { HasVatRegistrations } from '../helpers/has.vat.registrations';
import { HasBankAccount } from '../helpers/has.bank.account';
import { AccountingSchemeModel } from './accounting.scheme.model';
import { UserToOrganizationModel } from './user.to.organization.model';

export interface OrganizationModel extends BaseModel, HasLegalAddress,
  HasLegalName, HasVatRegistrations, HasBankAccount {
  accountingScheme: Promise<AccountingSchemeModel>;
  users: Promise<Array<UserToOrganizationModel>>;
  registration: string;
  contact: string;
  idNumber: string;
}
