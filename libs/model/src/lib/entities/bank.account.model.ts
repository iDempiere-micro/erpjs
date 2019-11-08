import { BaseModel } from '@erpjs/model';
import { BankModel } from './bank.model';

export interface BankAccountModel extends BaseModel {
  bank: Promise<BankModel>;
  bankAccountCustomerPrintableNumber: string;
  iban: string;
  swift: string;
}
