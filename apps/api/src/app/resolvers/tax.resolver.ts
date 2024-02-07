import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { Tax } from '../../model/generated/entities/Tax';
import { TaxModel, TaxService, TaxServiceKey } from '../../model';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { TaxSaveArgs } from '../saveArgs/tax.save.args';

@Resolver(() => Tax)
@UseGuards(GqlAuthGuard)
export class TaxResolver {
  constructor(
    @Inject(TaxServiceKey) protected readonly taxService: TaxService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [Tax])
  async taxes() {
    return await this.taxService.loadEntities(this.entityManager);
  }

  @Query(() => Tax)
  async tax(@Args('id', { type: () => Int }) id: number) {
    return await this.taxService.loadEntityById(this.entityManager, id);
  }

  @Mutation(() => Tax)
  async saveTax(
    @Args('args') objData: TaxSaveArgs,
    @CurrentUser() user,
  ): Promise<TaxModel> {
    return await this.taxService.save(this.entityManager, objData, user);
  }
}
