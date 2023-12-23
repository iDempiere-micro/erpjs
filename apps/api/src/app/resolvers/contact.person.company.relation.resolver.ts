import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { ContactPersonCompanyRelation } from '../../model/generated/entities/ContactPersonCompanyRelation';
import {
  ContactPersonCompanyRelationModel,
  ContactPersonCompanyRelationService,
  ContactPersonCompanyRelationServiceKey,
} from '../../model';
import { EntityManager } from 'typeorm';
import { ContactPersonCompanyRelationSaveArgs } from '../saveArgs/contact.person.company.relation.save.args';
import { InjectEntityManager } from '@nestjs/typeorm';

@Resolver(() => ContactPersonCompanyRelation)
@UseGuards(GqlAuthGuard)
export class ContactPersonCompanyRelationResolver {
  constructor(
    @Inject(ContactPersonCompanyRelationServiceKey)
    protected readonly contactPersonCompanyRelationService: ContactPersonCompanyRelationService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [ContactPersonCompanyRelation])
  async contactPersonCompanyRelations() {
    return await this.contactPersonCompanyRelationService.loadEntities(
      this.entityManager,
    );
  }

  @Query(() => ContactPersonCompanyRelation)
  async contactPersonCompanyRelation(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return await this.contactPersonCompanyRelationService.loadEntityById(
      this.entityManager,
      id,
    );
  }

  @Mutation(() => ContactPersonCompanyRelation)
  async saveContactPersonCompanyRelation(
    @Args('args') objData: ContactPersonCompanyRelationSaveArgs,
    @CurrentUser() user,
  ): Promise<ContactPersonCompanyRelationModel> {
    return await this.contactPersonCompanyRelationService.save(
      this.entityManager,
      objData,
      user,
    );
  }
}
