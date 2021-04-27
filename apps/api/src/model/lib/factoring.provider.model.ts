import { BaseModel } from './base.model';
import { BankAccountModel } from './bank.account.model';

export interface FactoringProviderModel extends BaseModel {
  displayName: string;
  legalName: string;
  contact: string;
  bankAccount: BankAccountModel;
}
