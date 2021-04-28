import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { FactoringContract } from '../../model/generated/entities/FactoringContract';
import {
  FactoringContractModel,
  FactoringContractService,
  FactoringContractServiceKey,
} from '../../model';
import { getManager } from 'typeorm';
import { FactoringContractSaveArgs } from '../saveArgs/factoring.contract.save.args';

@Resolver(() => FactoringContract)
@UseGuards(GqlAuthGuard)
export class FactoringContractResolver {
  constructor(
    @Inject(FactoringContractServiceKey)
    protected readonly factoringContractService: FactoringContractService,
  ) {}

  @Query(() => [FactoringContract])
  async factoringContracts() {
    return await this.factoringContractService.loadEntities(getManager(), {
      relations: ['factoringProvider', 'customer', 'organization'],
    });
  }

  @Query(() => FactoringContract)
  async factoringContract(@Args('id', { type: () => Int }) id: number) {
    return await this.factoringContractService.loadEntityById(getManager(), id);
  }

  @Mutation(() => FactoringContract)
  async saveFactoringContract(
    @Args('args') objData: FactoringContractSaveArgs,
    @CurrentUser() user,
  ): Promise<FactoringContractModel> {
    return await this.factoringContractService.save(
      getManager(),
      objData,
      user,
    );
  }
}
