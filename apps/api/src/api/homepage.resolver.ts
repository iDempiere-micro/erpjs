import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.auth.guard';
import { Query, Resolver } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';
import { AppUser, DateService, DateTimeScalarType, run } from '@erpjs/data';
import { getManager } from 'typeorm';
import { UserServiceKey } from '@erpjs/model';

@UseGuards(new GqlAuthGuard())
@Resolver()
export class HomepageResolver {
  constructor(
    @Inject(UserServiceKey) readonly userService,
  ) {}

  @Query(returns => DateTimeScalarType)
  async now(
    @CurrentUser() user: AppUser,
  ): Promise<Date> {
    return run(user, getManager(),() => DateService.getNow());
  }
}
