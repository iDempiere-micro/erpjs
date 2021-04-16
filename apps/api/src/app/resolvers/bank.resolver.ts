import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { Bank } from '../../model/generated/entities/Bank';
import { BankModel, BankService, BankServiceKey } from '../../model';
import { getManager } from 'typeorm';
import { BankSaveArgs } from '../saveArgs/bank.save.args';

@Resolver(() => Bank)
@UseGuards(GqlAuthGuard)
export class BankResolver {
  constructor(
    @Inject(BankServiceKey)
    protected readonly bankService: BankService,
  ) {}

  @Query(() => [Bank])
  async banks() {
    return await this.bankService.loadEntities(getManager());
  }

  @Query(() => Bank)
  async bank(@Args('id', { type: () => Int }) id: number) {
    const result = await this.bankService.loadEntityById(getManager(), id);
    return result;
  }

  @Mutation(() => Bank)
  async saveBank(
    @Args('args') objData: BankSaveArgs,
    @CurrentUser() user,
  ): Promise<BankModel> {
    return await this.bankService.save(getManager(), objData, user);
  }
}
