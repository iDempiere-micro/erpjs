import { BaseSaveArgsModel } from './base.save.args.model';
import { AddressSaveArgsModel } from './address.save.args.model';
import { AccountingSchemeModel } from './accounting.scheme.model';
import { BankAccountModel } from './bank.account.model';
import { BankAccountSaveArgsModel } from './bank.account.save.args.model';

export interface OrganizationSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  legalName: string;
  legalAddress: AddressSaveArgsModel;

  bankAccount?: BankAccountModel;
  bankAccountId?: number;
  newBankAccount?: BankAccountSaveArgsModel;

  accountingSchemeId?: number;
  accountingScheme?: AccountingSchemeModel;

  registration: string;
  contact: string;
  idNumber: string;
  vatNumber?: string;

  currentInvoiceDocumentNumber: number;
}
