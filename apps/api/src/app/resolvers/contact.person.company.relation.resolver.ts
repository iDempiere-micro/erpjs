import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { ContactPersonCompanyRelation } from '../../model/generated/entities/ContactPersonCompanyRelation';
import {
  ContactPersonCompanyRelationModel,
  ContactPersonCompanyRelationService,
  ContactPersonCompanyRelationServiceKey,
} from '../../model';
import { getManager } from 'typeorm';
import { ContactPersonCompanyRelationSaveArgs } from '../saveArgs/contact.person.company.relation.save.args';

@Resolver(() => ContactPersonCompanyRelation)
@UseGuards(GqlAuthGuard)
export class ContactPersonCompanyRelationResolver {
  constructor(
    @Inject(ContactPersonCompanyRelationServiceKey)
    protected readonly contactPersonCompanyRelationService: ContactPersonCompanyRelationService,
  ) {}

  @Query(() => [ContactPersonCompanyRelation])
  async contactPersonCompanyRelations() {
    return await this.contactPersonCompanyRelationService.loadEntities(
      getManager(),
    );
  }

  @Query(() => ContactPersonCompanyRelation)
  async contactPersonCompanyRelation(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return await this.contactPersonCompanyRelationService.loadEntityById(
      getManager(),
      id,
    );
  }

  @Mutation(() => ContactPersonCompanyRelation)
  async saveContactPersonCompanyRelation(
    @Args('args') objData: ContactPersonCompanyRelationSaveArgs,
    @CurrentUser() user,
  ): Promise<ContactPersonCompanyRelationModel> {
    return await this.contactPersonCompanyRelationService.save(
      getManager(),
      objData,
      user,
    );
  }
}
