import { BaseEntityResolver } from './base.entity.resolver';
import { CurrencyModel, CurrencyService, CurrencyServiceKey } from '@erpjs/model';
import { CurrencySaveArgs } from './args/currency.save.args';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';
import { CommonGetOneArgs, Currency } from '@erpjs/data';

export class CurrencyResolver extends BaseEntityResolver<CurrencyModel, CurrencySaveArgs, CurrencyService>
{
  constructor(
    @Inject(CurrencyServiceKey) private readonly currencyService : CurrencyService,
    ) {
    super();
  }

  getService(): CurrencyService {
    return this.currencyService;
  }

  @Query(returns => [Currency])
  async currencies(
    @CurrentUser() user,
  ) {
    return this.find(user);
  }

  @Mutation(returns => Currency)
  async currency(
    @Args('args') objData: CurrencySaveArgs , @CurrentUser() user,
  ): Promise<CurrencyModel> {
    return this.save(user, objData);
  }

  @Query(returns => Currency)
  async currencyById(
    @Args() args: CommonGetOneArgs,
    @CurrentUser() user,
  ): Promise<CurrencyModel> {
    return this.findById(args.id, user);
  }
}
