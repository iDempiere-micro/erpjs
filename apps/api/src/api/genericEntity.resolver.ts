import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.auth.guard';
import { User as CurrentUser } from './user.decorator';
import { GenericEntityArgs, GenericEntityResult, GenericEntityService } from '@erpjs/data';

@UseGuards(new GqlAuthGuard())
@Resolver()
export class GenericEntityResolver {
    constructor(private readonly objService: GenericEntityService) {}

    @Mutation(returns => GenericEntityResult)
    async setIsCurrent(
        @Args('args') objData: GenericEntityArgs , @CurrentUser() user,
    ): Promise<GenericEntityResult> {
        return await this.objService.setIsCurrent(objData);
    }

  @Query(returns => [GenericEntityResult])
  async getIsCurrent(
    @Args('args') objData: GenericEntityArgs , @CurrentUser() user,
  ): Promise<GenericEntityResult> {
    return await this.objService.getIsCurrent(objData);
  }

}
