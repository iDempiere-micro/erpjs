import { Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import {
  CustomerPriceListModel,
  CustomerPriceListService,
  CustomerPriceListServiceKey,
} from '../../model';
import { CustomerPriceList } from '../../model/generated/entities/CustomerPriceList';
import { CustomerPriceListSaveArgs } from '../saveArgs/customerPriceList.save.args';

@Resolver(() => CustomerPriceList)
@UseGuards(GqlAuthGuard)
export class CustomerPriceListResolver {
  constructor(
    @Inject(CustomerPriceListServiceKey)
    protected readonly customerPriceListService: CustomerPriceListService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [CustomerPriceList])
  async customerPriceLists() {
    return await this.customerPriceListService.loadEntities(this.entityManager);
  }

  @Query(() => CustomerPriceList)
  async customerPriceList(@Args('id', { type: () => Int }) id: number) {
    return await this.customerPriceListService.loadEntityById(
      this.entityManager,
      id,
    );
  }

  @Mutation(() => CustomerPriceList)
  async saveCustomerPriceList(
    @Args('args') objData: CustomerPriceListSaveArgs,
    @CurrentUser() user,
  ): Promise<CustomerPriceListModel> {
    return await this.customerPriceListService.save(
      this.entityManager,
      objData,
      user,
    );
  }
}
