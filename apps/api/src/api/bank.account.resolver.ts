import { BaseEntityResolver } from './base.entity.resolver';
import { BankAccountModel, BankAccountService, BankAccountServiceKey } from '@erpjs/model';
import { BankAccountSaveArgs } from './args/bank.account.save.args';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';
import { BankAccount, CommonGetOneArgs } from '@erpjs/data';

export class BankAccountResolver extends BaseEntityResolver<BankAccountModel, BankAccountSaveArgs, BankAccountService>
{
  constructor(
    @Inject(BankAccountServiceKey) private readonly bankAccountService : BankAccountService,
    ) {
    super();
  }

  getService(): BankAccountService {
    return this.bankAccountService;
  }

  @Query(returns => [BankAccount])
  async bankAccounts(
    @CurrentUser() user,
  ) {
    return this.find(user);
  }

  @Mutation(returns => BankAccount)
  async bankAccount(
    @Args('args') objData: BankAccountSaveArgs , @CurrentUser() user,
  ): Promise<BankAccountModel> {
    return this.save(user, objData);
  }

  @Query(returns => BankAccount)
  async bankAccountById(
    @Args() args: CommonGetOneArgs,
    @CurrentUser() user,
  ): Promise<BankAccountModel> {
    return this.findById(args.id, user);
  }
}
