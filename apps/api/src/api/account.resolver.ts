import { BaseEntityResolver } from './base.entity.resolver';
import { AccountModel, AccountService, AccountServiceKey } from '@erpjs/model';
import { AccountSaveArgs } from './args/account.save.args';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';
import { Account, CommonGetOneArgs } from '@erpjs/data';

export class AccountResolver extends BaseEntityResolver<AccountModel, AccountSaveArgs, AccountService>
{
  constructor(
    @Inject(AccountServiceKey) private readonly accountService : AccountService,
    ) {
    super();
  }

  getService(): AccountService {
    return this.accountService;
  }

  @Query(returns => [Account])
  async accounts(
    @CurrentUser() user,
  ) {
    return this.find(user);
  }

  @Mutation(returns => Account)
  async account(
    @Args('args') objData: AccountSaveArgs , @CurrentUser() user,
  ): Promise<AccountModel> {
    return this.save(user, objData);
  }

  @Query(returns => Account)
  async accountById(
    @Args() args: CommonGetOneArgs,
    @CurrentUser() user,
  ): Promise<AccountModel> {
    return this.findById(args.id, user);
  }
}
