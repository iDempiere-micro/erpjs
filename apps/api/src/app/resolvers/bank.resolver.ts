import { Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { BankModel, BankService, BankServiceKey } from '../../model';
import { Bank } from '../../model/generated/entities/Bank';
import { BankSaveArgs } from '../saveArgs/bank.save.args';

@Resolver(() => Bank)
@UseGuards(GqlAuthGuard)
export class BankResolver {
  constructor(
    @Inject(BankServiceKey)
    protected readonly bankService: BankService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [Bank])
  async banks() {
    return await this.bankService.loadEntities(this.entityManager);
  }

  @Query(() => Bank)
  async bank(@Args('id', { type: () => Int }) id: number) {
    return await this.bankService.loadEntityById(this.entityManager, id);
  }

  @Mutation(() => Bank)
  async saveBank(
    @Args('args') objData: BankSaveArgs,
    @CurrentUser() user,
  ): Promise<BankModel> {
    return await this.bankService.save(this.entityManager, objData, user);
  }
}
