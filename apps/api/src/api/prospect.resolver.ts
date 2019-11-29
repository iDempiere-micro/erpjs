import { BaseEntityResolver } from './base.entity.resolver';
import { ProspectModel, ProspectService, ProspectServiceKey } from '@erpjs/model';
import { ProspectSaveArgs } from './args/prospect.save.args';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';
import { CommonGetOneArgs, Prospect } from '@erpjs/data';

export class ProspectResolver
  extends BaseEntityResolver<ProspectModel, ProspectSaveArgs, ProspectService> {
  constructor(
    @Inject(ProspectServiceKey) private readonly prospectService: ProspectService,
  ) {
    super();
  }

  getService(): ProspectService {
    return this.prospectService;
  }

  @Query(returns => [Prospect])
  async prospects(
    @CurrentUser() user,
  ): Promise<Array<ProspectModel>> {
    return this.find(user);
  }

  @Mutation(returns => Prospect)
  async prospect(
    @Args('args') objData: ProspectSaveArgs , @CurrentUser() user,
  ): Promise<ProspectModel> {
    return this.save(user, objData);
  }

  @Query(returns => Prospect)
  async prospectById(
    @Args() args: CommonGetOneArgs,
    @CurrentUser() user,
  ): Promise<ProspectModel> {
    return this.findById(args.id, user);
  }


}
