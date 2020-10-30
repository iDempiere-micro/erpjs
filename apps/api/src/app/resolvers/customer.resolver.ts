import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  AddressService,
  AddressServiceKey,
  Customer,
  CustomerModel,
  CustomerService,
  CustomerServiceKey,
} from '../../model';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { getManager } from 'typeorm';
import { CustomerSaveArgs } from '../saveArgs/customer.save.args';

@Resolver(() => Customer )
@UseGuards(GqlAuthGuard)
export class CustomerResolver {
  constructor(
    @Inject(CustomerServiceKey) protected readonly customerService: CustomerService,
    @Inject(AddressServiceKey) protected readonly addressService: AddressService
  ) {
  }

  @Query(()=>[Customer])
  async customers() {
    return await this.customerService.loadEntities(getManager())
  }

  @Query(() => Customer)
  async customer(@Args('id', { type: () => Int }) id: number) {
    return await this.customerService.loadEntityById(getManager(), id);
  }

  @ResolveField()
  async legalAddress(@Parent() customer: Customer) {
    const entityManager = getManager();
    const { id } = customer;
    // eslint-disable-next-line @typescript-eslint/camelcase
    const { customer_legalAddressId } =
      await this.customerService.createQueryBuilder(entityManager, `customer`).where(`customer.id=:id`, {id} ).getRawOne();
    return this.addressService.loadEntityById(entityManager, customer_legalAddressId);
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Args('args') objData: CustomerSaveArgs,
    @CurrentUser() user
  ): Promise<CustomerModel> {
    return this.customerService.save(getManager(), objData);
  }

}
