import { BankAccountModel } from './bank.account.model';
import { BankAccountSaveArgsModel } from './bank.account.save.args.model';
import { BaseSaveArgsModel } from './base.save.args.model';

export interface FactoringProviderSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  legalName: string;
  contact: string;

  bankAccount?: BankAccountModel;
  bankAccountId?: number;
  newBankAccount?: BankAccountSaveArgsModel;
}
