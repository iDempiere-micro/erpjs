import { Inject } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';
import { CommonGetOneArgs, Customer } from '@erpjs/data';
import { CustomerSaveArgs } from './args/customer.save.args';
import { CustomerModel, CustomerService, CustomerServiceKey } from '@erpjs/model';
import { BaseEntityResolver } from './base.entity.resolver';

export class CustomerResolver
extends BaseEntityResolver<CustomerModel, CustomerSaveArgs, CustomerService>
{
  constructor(
    @Inject(CustomerServiceKey) private readonly customerService : CustomerService,
  ) { super(); }

  getCtor(): { new(...args: any[]): CustomerModel } {
    return Customer;
  }

  getService(): CustomerService {
    return this.customerService;
  }

  @Query(returns => [Customer])
  async customers(
    @CurrentUser() user,
  ): Promise<Array<CustomerModel>> {
    return this.find(user);
  }
  @Query(returns => Customer)
  async customerById(
    @Args() args: CommonGetOneArgs,
    @CurrentUser() user,
  ): Promise<CustomerModel> {
    return this.findById(args.id, user);
  }

  @Mutation(returns => Customer)
  async customer(
    @Args('args') objData: CustomerSaveArgs , @CurrentUser() user,
  ): Promise<CustomerModel> {
    return this.save(user, objData);
  }

}
