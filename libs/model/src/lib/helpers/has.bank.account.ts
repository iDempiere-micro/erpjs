import { BankAccountModel } from '../entities/bank.account.model';

export interface HasBankAccount {
  bankAccount: Promise<BankAccountModel>;
}
