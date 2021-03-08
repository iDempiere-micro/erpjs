import { Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth';
import { Organization } from '../../model/generated/entities/Organization';
import { OrganizationService, OrganizationServiceKey } from '../../model';
import { getManager } from 'typeorm';

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
}
