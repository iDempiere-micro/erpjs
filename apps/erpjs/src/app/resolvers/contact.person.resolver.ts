import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { ContactPerson } from '../../model/generated/entities/ContactPerson';
import {
  ContactPersonModel,
  ContactPersonService,
  ContactPersonServiceKey,
} from '../../model';
import { getManager } from 'typeorm';
import { ContactPersonSaveArgs } from '../saveArgs/contact.person.save.args';

@Resolver(() => ContactPerson)
@UseGuards(GqlAuthGuard)
export class ContactPersonResolver {
  constructor(
    @Inject(ContactPersonServiceKey)
    protected readonly contactPersonService: ContactPersonService,
  ) {}

  @Query(() => [ContactPerson])
  async contactPersons() {
    return await this.contactPersonService.loadEntities(getManager());
  }

  @Query(() => ContactPerson)
  async contactPerson(@Args('id', { type: () => Int }) id: number) {
    return await this.contactPersonService.loadEntityById(getManager(), id);
  }

  @Mutation(() => ContactPerson)
  async saveContactPerson(
    @Args('args') objData: ContactPersonSaveArgs,
    @CurrentUser() user,
  ): Promise<ContactPersonModel> {
    return await this.contactPersonService.save(getManager(), objData, user);
  }
}
