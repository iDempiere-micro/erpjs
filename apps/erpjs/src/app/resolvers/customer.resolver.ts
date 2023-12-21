import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  AddressService,
  AddressServiceKey,
  CustomerModel,
  CustomerService,
  CustomerServiceKey,
} from '../../model';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { getManager } from 'typeorm';
import { CustomerSaveArgs } from '../saveArgs/customer.save.args';
import { Customer } from '../../model/generated/entities/Customer';

@Resolver(() => Customer)
@UseGuards(GqlAuthGuard)
export class CustomerResolver {
  constructor(
    @Inject(CustomerServiceKey)
    protected readonly customerService: CustomerService,
    @Inject(AddressServiceKey)
    protected readonly addressService: AddressService,
  ) {}

  @Query(() => [Customer])
  async customers() {
    return await this.customerService.loadEntities(getManager());
  }

  @Query(() => Customer)
  async customer(@Args('id', { type: () => Int }) id: number) {
    return await this.customerService.loadEntityById(getManager(), id);
  }

  @Query(() => [Customer])
  async customersByArgs(
    @Args('displayName', { type: () => String, nullable: true })
    displayName: string,
    @Args('legalName', { type: () => String, nullable: true })
    legalName: string,
  ) {
    const where: any = {};
    if (displayName) {
      where.displayName = displayName;
    }
    if (legalName) {
      where.legalName = legalName;
    }

    return await this.customerService.loadEntities(getManager(), { where });
  }

  @ResolveField()
  async legalAddress(@Parent() customer: Customer) {
    const entityManager = getManager();
    const { id } = customer;
    const { customer_legalAddressId } = await this.customerService
      .createQueryBuilder(entityManager, `customer`)
      .where(`customer.id=:id`, { id })
      .getRawOne();
    return this.addressService.loadEntityById(
      entityManager,
      customer_legalAddressId,
    );
  }

  @Mutation(() => Customer)
  async saveCustomer(
    @Args('args') objData: CustomerSaveArgs,
    @CurrentUser() user,
  ): Promise<CustomerModel> {
    return await this.customerService.save(getManager(), objData, user);
  }
}
