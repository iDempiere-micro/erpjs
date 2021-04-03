import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { Organization } from '../../model/generated/entities/Organization';
import {
  OrganizationModel,
  OrganizationService,
  OrganizationServiceKey,
} from '../../model';
import { getManager } from 'typeorm';
import { OrganizationSaveArgs } from '../saveArgs/organization.save.args';

@Resolver(() => Organization)
@UseGuards(GqlAuthGuard)
export class OrganizationResolver {
  constructor(
    @Inject(OrganizationServiceKey)
    protected readonly organizationService: OrganizationService,
  ) {}

  @Query(() => [Organization])
  async organizations() {
    return await this.organizationService.loadEntities(getManager());
  }

  @Mutation(() => Organization)
  async saveOrganization(
    @Args('args') objData: OrganizationSaveArgs,
    @CurrentUser() user,
  ): Promise<OrganizationModel> {
    return await this.organizationService.save(getManager(), objData, user);
  }
}
