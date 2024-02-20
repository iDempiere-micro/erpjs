import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Bank } from '../generated/entities/Bank';
import { BankModel } from './bank.model';
import { BankSaveArgsModel } from './bank.save.args.model';
import { BaseEntityService } from './base.entity.service';

export const BankServiceKey = 'BankService';

@Injectable()
export class BankService extends BaseEntityService<
  BankModel,
  BankSaveArgsModel
> {
  createEntity(): BankModel {
    return new Bank();
  }

  protected getRepository(transactionalEntityManager): Repository<BankModel> {
    return transactionalEntityManager.getRepository(Bank);
  }
  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: BankSaveArgsModel,
    bank: BankModel,
  ): Promise<BankModel> {
    bank.displayName = args.displayName;
    bank.bankIdentifierCode = args.bankIdentifierCode;
    return bank;
  }

  typeName(): string {
    return BankServiceKey;
  }

  getBank = async (
    transactionalEntityManager: EntityManager,
    displayName: string,
  ) =>
    this.getRepository(transactionalEntityManager).findOne({
      where: { displayName },
    });
}
