import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { AccountingScheme } from '../../model/generated/entities/AccountingScheme';
import {
  AccountingSchemeModel,
  AccountingSchemeService,
  AccountingSchemeServiceKey,
} from '../../model';
import { EntityManager, getManager } from 'typeorm';
import { AccountingSchemeSaveArgs } from '../saveArgs/accounting.scheme.save.args';
import { InjectEntityManager } from '@nestjs/typeorm';

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
