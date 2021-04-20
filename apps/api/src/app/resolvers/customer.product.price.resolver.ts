import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { CustomerProductPrice } from '../../model/generated/entities/CustomerProductPrice';
import {
  CustomerProductPriceModel,
  CustomerProductPriceService,
  CustomerProductPriceServiceKey,
} from '../../model';
import { getManager } from 'typeorm';
import { CustomerProductPriceSaveArgs } from '../saveArgs/customer.product.price.save.args';

@Resolver(() => CustomerProductPrice)
@UseGuards(GqlAuthGuard)
export class CustomerProductPriceResolver {
  constructor(
    @Inject(CustomerProductPriceServiceKey)
    protected readonly customerProductPriceService: CustomerProductPriceService,
  ) {}

  @Query(() => [CustomerProductPrice])
  async customerProductPrices() {
    return await this.customerProductPriceService.loadEntities(getManager());
  }

  @Query(() => CustomerProductPrice)
  async customerProductPrice(@Args('id', { type: () => Int }) id: number) {
    return await this.customerProductPriceService.loadEntityById(
      getManager(),
      id,
    );
  }

  @Mutation(() => CustomerProductPrice)
  async saveCustomerProductPrice(
    @Args('args') objData: CustomerProductPriceSaveArgs,
    @CurrentUser() user,
  ): Promise<CustomerProductPriceModel> {
    return await this.customerProductPriceService.save(
      getManager(),
      objData,
      user,
    );
  }
}
