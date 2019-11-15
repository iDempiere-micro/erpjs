import { BaseEntityServiceImplementation } from './base.entity.service';
import { BankAccountModel } from '../entities/bank.account.model';
import { BankAccountSaveArgsModel } from '../args/bank.account.save.args.model';

export const BankAccountServiceKey = 'BankAccountService';

export class BankAccountService extends BaseEntityServiceImplementation<BankAccountModel, BankAccountSaveArgsModel> {
  protected async doSave(args: BankAccountSaveArgsModel, bankAccountModel: BankAccountModel): Promise<BankAccountModel> {
    bankAccountModel.displayName = args.displayName;
    bankAccountModel.swift = args.swift;
    bankAccountModel.iban = args.iban;
    bankAccountModel.bankAccountCustomerPrintableNumber = args.bankAccountCustomerPrintableNumber;
    bankAccountModel.bank = Promise.resolve(args.bank? args.bank : await this.loadBank(args.bankId));
    return bankAccountModel;
  }

  typeName(): string {
    return BankAccountServiceKey;
  }

}
