import { Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import {
  FactoringProviderModel,
  FactoringProviderService,
  FactoringProviderServiceKey,
} from '../../model';
import { FactoringProvider } from '../../model/generated/entities/FactoringProvider';
import { FactoringContractSaveArgs } from '../saveArgs/factoring.contract.save.args';
import { FactoringProviderSaveArgs } from '../saveArgs/factoring.provider.save.args';

@Resolver(() => FactoringProvider)
@UseGuards(GqlAuthGuard)
export class FactoringProviderResolver {
  constructor(
    @Inject(FactoringProviderServiceKey)
    protected readonly factoringProviderService: FactoringProviderService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [FactoringProvider])
  async factoringProviders() {
    return await this.factoringProviderService.loadEntities(this.entityManager);
  }

  @Query(() => [FactoringProvider])
  async factoringProvidersForInvoice(
    @Args('args') objData: FactoringContractSaveArgs,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser() user,
  ) {
    const manager = this.entityManager;
    return await this.factoringProviderService.getPossibleFactoringProviders(
      manager,
      objData.organizationId,
      objData.customerId,
    );
  }

  @Query(() => FactoringProvider)
  async factoringProvider(@Args('id', { type: () => Int }) id: number) {
    return await this.factoringProviderService.loadEntityById(
      this.entityManager,
      id,
    );
  }

  @Mutation(() => FactoringProvider)
  async saveFactoringProvider(
    @Args('args') objData: FactoringProviderSaveArgs,
    @CurrentUser() user,
  ): Promise<FactoringProviderModel> {
    return await this.factoringProviderService.save(
      this.entityManager,
      objData,
      user,
    );
  }
}
