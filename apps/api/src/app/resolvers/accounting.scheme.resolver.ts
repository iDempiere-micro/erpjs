import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { AccountingScheme } from '../../model/generated/entities/AccountingScheme';
import {
  AccountingSchemeModel,
  AccountingSchemeService,
  AccountingSchemeServiceKey,
} from '../../model';
import { getManager } from 'typeorm';
import { AccountingSchemeSaveArgs } from '../saveArgs/accounting.scheme.save.args';

@Resolver(() => AccountingScheme)
@UseGuards(GqlAuthGuard)
export class AccountingSchemeResolver {
  constructor(
    @Inject(AccountingSchemeServiceKey)
    protected readonly accountingSchemeService: AccountingSchemeService,
  ) {}

  @Query(() => [AccountingScheme])
  async accountingSchemes() {
    return await this.accountingSchemeService.loadEntities(getManager());
  }

  @Query(() => AccountingScheme)
  async accountingScheme(@Args('id', { type: () => Int }) id: number) {
    const result = await this.accountingSchemeService.loadEntityById(
      getManager(),
      id,
    );
    return result;
  }

  @Mutation(() => AccountingScheme)
  async saveAccountingScheme(
    @Args('args') objData: AccountingSchemeSaveArgs,
    @CurrentUser() user,
  ): Promise<AccountingSchemeModel> {
    return await this.accountingSchemeService.save(getManager(), objData, user);
  }
}
