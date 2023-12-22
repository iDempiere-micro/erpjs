import { BankModel } from './bank.model';
import { BaseSaveArgsModel } from './base.save.args.model';

export interface BankAccountSaveArgsModel extends BaseSaveArgsModel {
  bankId?: number;
  bank?: BankModel;
  bankDisplayName?: string;
  displayName: string;
  bankAccountCustomerPrintableNumber: string;
  iban: string;
  swift: string;
}
