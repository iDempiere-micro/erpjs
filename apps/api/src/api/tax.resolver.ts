import { BaseEntityResolver } from './base.entity.resolver';
import { TaxModel, TaxService, TaxServiceKey } from '@erpjs/model';
import { TaxSaveArgs } from './args/tax.save.args';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';
import { CommonGetOneArgs, Tax } from '@erpjs/data';

export class TaxResolver
  extends BaseEntityResolver<TaxModel, TaxSaveArgs, TaxService> {
  constructor(
    @Inject(TaxServiceKey) private readonly taxService: TaxService,
  ) {
    super();
  }

  getService(): TaxService {
    return this.taxService;
  }

  @Query(returns => [Tax])
  async taxes(
    @CurrentUser() user,
  ): Promise<Array<TaxModel>> {
    return this.find(user);
  }

  @Mutation(returns => Tax)
  async tax(
    @Args('args') objData: TaxSaveArgs , @CurrentUser() user,
  ): Promise<TaxModel> {
    return this.save(user, objData);
  }

  @Query(returns => Tax)
  async taxById(
    @Args() args: CommonGetOneArgs,
    @CurrentUser() user,
  ): Promise<TaxModel> {
    return this.findById(args.id, user);
  }


}
