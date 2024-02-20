import { Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import {
  OrganizationModel,
  OrganizationService,
  OrganizationServiceKey,
} from '../../model';
import { Organization } from '../../model/generated/entities/Organization';
import { OrganizationSaveArgs } from '../saveArgs/organization.save.args';

@Resolver(() => Organization)
@UseGuards(GqlAuthGuard)
export class OrganizationResolver {
  constructor(
    @Inject(OrganizationServiceKey)
    protected readonly organizationService: OrganizationService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [Organization])
  async organizations() {
    return await this.organizationService.loadEntities(this.entityManager);
  }

  @Query(() => Organization)
  async organization(@Args('id', { type: () => Int }) id: number) {
    const result = await this.organizationService.loadEntityById(
      this.entityManager,
      id,
    );
    return result;
  }

  @Mutation(() => Organization)
  async saveOrganization(
    @Args('args') objData: OrganizationSaveArgs,
    @CurrentUser() user,
  ): Promise<OrganizationModel> {
    return await this.organizationService.save(
      this.entityManager,
      objData,
      user,
    );
  }
}
