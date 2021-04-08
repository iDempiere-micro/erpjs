import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { DateTimeScalarType } from './support/date.scalar';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../auth';
import { DateService, DateServiceKey, UserModel } from '../model';

@Resolver()
@UseGuards(GqlAuthGuard)
export class AppResolver {
  constructor(
    @Inject(DateServiceKey) protected readonly dateService: DateService,
  ) {}

  @Query(() => DateTimeScalarType)
  async now(@CurrentUser() user: UserModel): Promise<Date> {
    return user && this.dateService.now();
  }

  @Mutation(() => DateTimeScalarType)
  async keepAlive(@CurrentUser() user: UserModel) {
    return user && this.dateService.now();
  }
}
