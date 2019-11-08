import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.auth.guard';
import { Query, Resolver } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';
import { AppUser, DateService, run, USER_SERVICE } from '@erpjs/data';
import { getManager } from 'typeorm';

@UseGuards(new GqlAuthGuard())
@Resolver()
export class HomepageResolver {
  constructor(
    @Inject(USER_SERVICE) readonly userService,
  ) {}

  @Query(returns => Date)
  async now(
    @CurrentUser() user: AppUser,
  ): Promise<Date> {
    return run(user, getManager(),() => DateService.getNow());
  }
}
