import { BaseSaveArgsModel } from './base.save.args.model';

export interface BankAccountSaveArgsModel extends BaseSaveArgsModel {
  bankId: number;
  displayName : string;
  bankAccountCustomerPrintableNumber : string;
  iban : string;
  swift : string;
}
