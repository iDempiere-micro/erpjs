import { BaseEntityServiceImplementation } from './base.entity.service';
import { BankModel } from '../entities/bank.model';
import { BankSaveArgsModel } from '../args/bank.save.args.model';

export const BankServiceKey = 'BankService';

export class BankService extends BaseEntityServiceImplementation<BankModel, BankSaveArgsModel> {
  protected async doSave(args: BankSaveArgsModel, bank: BankModel): Promise<BankModel> {
    bank.displayName = args.displayName;
    bank.bankIdentifierCode = args.bankIdentifierCode;
    return bank;
  }

  typeName(): string {
    return BankServiceKey;
  }

}
