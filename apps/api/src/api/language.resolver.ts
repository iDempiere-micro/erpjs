import { Query, Resolver } from '@nestjs/graphql';
import { AppUser, Language, languages, run } from '@erpjs/data';
import { User as CurrentUser } from './user.decorator';
import { getManager } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.auth.guard';

@UseGuards(new GqlAuthGuard())
@Resolver()
export class LanguageResolver {
  @Query(returns => [Language])
  async languages(
    @CurrentUser() user: AppUser,
  ): Promise<Array<Language>> {
    return run(user, getManager(),() => languages);
  }
}
