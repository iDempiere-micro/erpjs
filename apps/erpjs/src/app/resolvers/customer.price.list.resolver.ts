import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { CustomerPriceList } from '../../model/generated/entities/CustomerPriceList';
import {
  CustomerPriceListModel,
  CustomerPriceListService,
  CustomerPriceListServiceKey,
} from '../../model';
import {EntityManager, getManager} from 'typeorm';
import { CustomerPriceListSaveArgs } from '../saveArgs/customerPriceList.save.args';
import {InjectEntityManager} from "@nestjs/typeorm";

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
    return await this.customerPriceListService.loadEntityById(this.entityManager, id);
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
