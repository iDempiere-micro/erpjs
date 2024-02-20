import { Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import {
  AccountingSchemeModel,
  AccountingSchemeService,
  AccountingSchemeServiceKey,
} from '../../model';
import { AccountingScheme } from '../../model/generated/entities/AccountingScheme';
import { AccountingSchemeSaveArgs } from '../saveArgs/accounting.scheme.save.args';

@Resolver(() => AccountingScheme)
@UseGuards(GqlAuthGuard)
export class AccountingSchemeResolver {
  constructor(
    @Inject(AccountingSchemeServiceKey)
    protected readonly accountingSchemeService: AccountingSchemeService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [AccountingScheme])
  async accountingSchemes() {
    return await this.accountingSchemeService.loadEntities(this.entityManager);
  }

  @Query(() => AccountingScheme)
  async accountingScheme(@Args('id', { type: () => Int }) id: number) {
    const result = await this.accountingSchemeService.loadEntityById(
      this.entityManager,
      id,
    );
    return result;
  }

  @Mutation(() => AccountingScheme)
  async saveAccountingScheme(
    @Args('args') objData: AccountingSchemeSaveArgs,
    @CurrentUser() user,
  ): Promise<AccountingSchemeModel> {
    return await this.accountingSchemeService.save(
      this.entityManager,
      objData,
      user,
    );
  }
}
