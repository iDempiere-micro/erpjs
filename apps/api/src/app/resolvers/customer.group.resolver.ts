import { Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import {
  CustomerGroupModel,
  CustomerGroupService,
  CustomerGroupServiceKey,
} from '../../model';
import { CustomerGroup } from '../../model/generated/entities/CustomerGroup';
import { CustomerGroupSaveArgs } from '../saveArgs/customerGroup.save.args';

@Resolver(() => CustomerGroup)
@UseGuards(GqlAuthGuard)
export class CustomerGroupResolver {
  constructor(
    @Inject(CustomerGroupServiceKey)
    protected readonly customerGroupService: CustomerGroupService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [CustomerGroup])
  async customerGroups() {
    return await this.customerGroupService.loadEntities(this.entityManager);
  }

  @Query(() => CustomerGroup)
  async customerGroup(@Args('id', { type: () => Int }) id: number) {
    return await this.customerGroupService.loadEntityById(
      this.entityManager,
      id,
    );
  }

  @Mutation(() => CustomerGroup)
  async saveCustomerGroup(
    @Args('args') objData: CustomerGroupSaveArgs,
    @CurrentUser() user,
  ): Promise<CustomerGroupModel> {
    return await this.customerGroupService.save(
      this.entityManager,
      objData,
      user,
    );
  }
}
