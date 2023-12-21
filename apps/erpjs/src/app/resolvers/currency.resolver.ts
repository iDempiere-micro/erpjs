import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { Currency } from '../../model/generated/entities/Currency';
import {
  CurrencyModel,
  CurrencyService,
  CurrencyServiceKey,
} from '../../model';
import { EntityManager, getManager } from 'typeorm';
import { CurrencySaveArgs } from '../saveArgs/currency.save.args';
import { InjectEntityManager } from '@nestjs/typeorm';

@Resolver(() => Currency)
@UseGuards(GqlAuthGuard)
export class CurrencyResolver {
  constructor(
    @Inject(CurrencyServiceKey)
    protected readonly currencyService: CurrencyService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [Currency])
  async currencies() {
    return await this.currencyService.loadEntities(this.entityManager);
  }

  @Mutation(() => Currency)
  async saveCurrency(
    @Args('args') objData: CurrencySaveArgs,
    @CurrentUser() user,
  ): Promise<CurrencyModel> {
    return await this.currencyService.save(this.entityManager, objData, user);
  }

  @Query(() => Currency)
  async currency(@Args('id', { type: () => Int }) id: number) {
    const result = await this.currencyService.loadEntityById(
      this.entityManager,
      id,
    );
    return result;
  }
}
