import { BankAccountModel } from '@erpjs/model';

export interface HasBankAccount {
  bankAccount: Promise<BankAccountModel>;
}
