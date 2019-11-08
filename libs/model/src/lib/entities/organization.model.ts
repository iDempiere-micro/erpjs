import {
  AccountingSchemeModel,
  BaseModel,
  HasBankAccount,
  HasLegalAddress,
  HasLegalName,
  HasVatRegistrations,
  UserToOrganizationModel
} from '../..';

export interface OrganizationModel extends BaseModel, HasLegalAddress,
  HasLegalName, HasVatRegistrations, HasBankAccount {
  accountingScheme: Promise<AccountingSchemeModel>;
  users: Promise<Array<UserToOrganizationModel>>;
  registration: string;
  contact: string;
}
