import { BankModel } from './bank.model';
import { BaseModel } from './base.model';

export interface BankAccountModel extends BaseModel {
  bank: BankModel;
  displayName: string;
  bankAccountCustomerPrintableNumber: string;
  iban: string;
  swift: string;
}
