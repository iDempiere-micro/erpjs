import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { BankAccount } from '../generated/entities/BankAccount';
import { BankAccountModel } from './bank.account.model';
import { BankAccountSaveArgsModel } from './bank.account.save.args.model';
import { BankService, BankServiceKey } from './bank.service';
import { BaseEntityService } from './base.entity.service';

export const BankAccountServiceKey = 'BankAccountService';

@Injectable()
export class BankAccountService extends BaseEntityService<
  BankAccountModel,
  BankAccountSaveArgsModel
> {
  createEntity(): BankAccountModel {
    return new BankAccount();
  }

  constructor(
    @Inject(BankServiceKey) protected readonly bankService: BankService,
  ) {
    super();
  }

  protected getRepository(
    transactionalEntityManager,
  ): Repository<BankAccountModel> {
    return transactionalEntityManager.getRepository(BankAccount);
  }
  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: BankAccountSaveArgsModel,
    bankAccountModel: BankAccountModel,
  ): Promise<BankAccountModel> {
    bankAccountModel.displayName = args.displayName;
    bankAccountModel.swift = args.swift;
    bankAccountModel.iban = args.iban;
    bankAccountModel.bankAccountCustomerPrintableNumber =
      args.bankAccountCustomerPrintableNumber;
    bankAccountModel.bank =
      args.bank ||
      (args.bankDisplayName
        ? await this.bankService.getBank(
            transactionalEntityManager,
            args.bankDisplayName,
          )
        : await this.bankService.loadEntityById(
            transactionalEntityManager,
            args.bankId,
          ));
    return bankAccountModel;
  }

  typeName(): string {
    return BankAccountServiceKey;
  }
}
