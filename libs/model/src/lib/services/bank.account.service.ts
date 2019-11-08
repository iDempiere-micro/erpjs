import { BaseEntityService } from './base.entity.service';
import { BankAccountModel, BankAccountSaveArgsModel, BaseService } from '../..';

export abstract class BankAccountService extends BaseService implements BaseEntityService<BankAccountModel, BankAccountSaveArgsModel> {
  async abstract createEntity(): Promise<BankAccountModel>;

  async abstract loadEntity(id: number): Promise<BankAccountModel>;

  async save(args: BankAccountSaveArgsModel): Promise<BankAccountModel> {
    const bankAccountModel =
      args.id ? await this.loadEntity(args.id) : await this.createEntity();
    bankAccountModel.displayName =  args.displayName;
    bankAccountModel.swift = args.swift;
    bankAccountModel.iban = args.iban;
    bankAccountModel.bankAccountCustomerPrintableNumber = args.bankAccountCustomerPrintableNumber;
    bankAccountModel.bank = this.loadBank(args.bankId);
    return bankAccountModel;
  }

}
