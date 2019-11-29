import { BaseEntityResolver } from './base.entity.resolver';
import {
  OrganizationModel,
  OrganizationService,
  OrganizationServiceKey,
  UserService,
  UserServiceKey
} from '@erpjs/model';
import { OrganizationSaveArgs } from './args/organization.save.args';
import { Inject } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { CommonGetOneArgs, run } from '@erpjs/data';
import { User as CurrentUser } from './user.decorator';
import { Organization } from '../../../../libs/data/src/lib/entities/organization';
import { getManager } from 'typeorm';

export class OrganizationResolver
  extends BaseEntityResolver<OrganizationModel, OrganizationSaveArgs, OrganizationService>
{
  constructor(
    @Inject(OrganizationServiceKey) private readonly organizationService: OrganizationService,
    @Inject(UserServiceKey) private readonly userService: UserService,
  ) {super();}

  getService(): OrganizationService {
    return this.organizationService;
  }

  @Query(returns => [Organization])
  async myOrganizations(
    @CurrentUser() user,
  ): Promise<Array<OrganizationModel>> {
    return await run(user, getManager(), async () => {
        console.log('**** user', user);
        const result = [];
        const user1 = await this.userService.loadEntity(user.id);
        console.log('**** user1', user1);
        const userOrganizations = await user1.organizations;
        for (const userOrganization of userOrganizations) {
          result.push(await userOrganization.organization);
        }
        return result;
      }
    );
  }

  @Query(returns => Organization)
  async organizationById(
    @Args() args: CommonGetOneArgs,
    @CurrentUser() user,
  ): Promise<OrganizationModel> {
    return this.findById(args.id, user);
  }
}
