import { BaseEntityService } from './base.entity.service';
import { BankModel, BankSaveArgsModel } from '../..';

export abstract class BankService implements BaseEntityService<BankModel, BankSaveArgsModel>
{
  async abstract createEntity(): Promise<BankModel>;

  async abstract loadEntity(id: number): Promise<BankModel>;

  async save(args: BankSaveArgsModel): Promise<BankModel> {
    const bankModel =
      args.id ? await this.loadEntity(args.id) : await this.createEntity();
    bankModel.displayName =  args.displayName;
    bankModel.bankIdentifierCode = args.bankIdentifierCode;
    return bankModel;
  }

}
