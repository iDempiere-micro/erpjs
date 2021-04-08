import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { Currency } from '../../model/generated/entities/Currency';
import {
  CurrencyModel,
  CurrencyService,
  CurrencyServiceKey,
} from '../../model';
import { getManager } from 'typeorm';
import { CurrencySaveArgs } from '../saveArgs/currency.save.args';

@Resolver(() => Currency)
@UseGuards(GqlAuthGuard)
export class CurrencyResolver {
  constructor(
    @Inject(CurrencyServiceKey)
    protected readonly currencyService: CurrencyService,
  ) {}

  @Query(() => [Currency])
  async currencies() {
    return await this.currencyService.loadEntities(getManager());
  }

  @Mutation(() => Currency)
  async saveCurrency(
    @Args('args') objData: CurrencySaveArgs,
    @CurrentUser() user,
  ): Promise<CurrencyModel> {
    return await this.currencyService.save(getManager(), objData, user);
  }

  @Query(() => Currency)
  async currency(@Args('id', { type: () => Int }) id: number) {
    const result = await this.currencyService.loadEntityById(getManager(), id);
    return result;
  }
}
