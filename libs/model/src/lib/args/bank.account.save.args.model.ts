import { BaseSaveArgsModel } from './base.save.args.model';
import { BankModel } from '../entities/bank.model';

export interface BankAccountSaveArgsModel extends BaseSaveArgsModel {
  bankId?: number;
  bank?: BankModel;
  displayName : string;
  bankAccountCustomerPrintableNumber : string;
  iban : string;
  swift : string;
}
