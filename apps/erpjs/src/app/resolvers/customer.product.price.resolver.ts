import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { CustomerProductPrice } from '../../model/generated/entities/CustomerProductPrice';
import {
  CustomerProductPriceModel,
  CustomerProductPriceService,
  CustomerProductPriceServiceKey,
} from '../../model';
import {EntityManager, getManager} from 'typeorm';
import { CustomerProductPriceSaveArgs } from '../saveArgs/customer.product.price.save.args';
import {InjectEntityManager} from "@nestjs/typeorm";

@Resolver(() => CustomerProductPrice)
@UseGuards(GqlAuthGuard)
export class CustomerProductPriceResolver {
  constructor(
    @Inject(CustomerProductPriceServiceKey)
    protected readonly customerProductPriceService: CustomerProductPriceService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [CustomerProductPrice])
  async customerProductPrices() {
    return await this.customerProductPriceService.loadEntities(this.entityManager);
  }

  @Query(() => CustomerProductPrice)
  async customerProductPrice(@Args('id', { type: () => Int }) id: number) {
    return await this.customerProductPriceService.loadEntityById(
      this.entityManager,
      id,
    );
  }

  @Mutation(() => CustomerProductPrice)
  async saveCustomerProductPrice(
    @Args('args') objData: CustomerProductPriceSaveArgs,
    @CurrentUser() user,
  ): Promise<CustomerProductPriceModel> {
    return await this.customerProductPriceService.save(
      this.entityManager,
      objData,
      user,
    );
  }
}
