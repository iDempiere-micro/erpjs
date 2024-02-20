import { BankAccountModel } from './bank.account.model';
import { BaseModel } from './base.model';

export interface FactoringProviderModel extends BaseModel {
  displayName: string;
  legalName: string;
  contact: string;
  bankAccount: BankAccountModel;
}
