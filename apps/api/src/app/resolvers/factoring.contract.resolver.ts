import { Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import {
  FactoringContractModel,
  FactoringContractService,
  FactoringContractServiceKey,
} from '../../model';
import { FactoringContract } from '../../model/generated/entities/FactoringContract';
import { FactoringContractSaveArgs } from '../saveArgs/factoring.contract.save.args';

@Resolver(() => FactoringContract)
@UseGuards(GqlAuthGuard)
export class FactoringContractResolver {
  constructor(
    @Inject(FactoringContractServiceKey)
    protected readonly factoringContractService: FactoringContractService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [FactoringContract])
  async factoringContracts() {
    return await this.factoringContractService.loadEntities(
      this.entityManager,
      {
        relations: ['factoringProvider', 'customer', 'organization'],
      },
    );
  }

  @Query(() => FactoringContract)
  async factoringContract(@Args('id', { type: () => Int }) id: number) {
    return await this.factoringContractService.loadEntityById(
      this.entityManager,
      id,
    );
  }

  @Mutation(() => FactoringContract)
  async saveFactoringContract(
    @Args('args') objData: FactoringContractSaveArgs,
    @CurrentUser() user,
  ): Promise<FactoringContractModel> {
    return await this.factoringContractService.save(
      this.entityManager,
      objData,
      user,
    );
  }
}
