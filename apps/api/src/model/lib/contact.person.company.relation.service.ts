import { Inject } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { ContactPersonCompanyRelation } from '../generated/entities/ContactPersonCompanyRelation';
import { BaseEntityService } from './base.entity.service';
import { ContactPersonCompanyRelationModel } from './contact.person.company.relation.model';
import { ContactPersonCompanyRelationSaveArgsModel } from './contact.person.company.relation.save.args.model';
import {
  ContactPersonService,
  ContactPersonServiceKey,
} from './contact.person.service';
import { CustomerService, CustomerServiceKey } from './customer.service';

export const ContactPersonCompanyRelationServiceKey =
  'ContactPersonCompanyRelationService';

export class ContactPersonCompanyRelationService extends BaseEntityService<
  ContactPersonCompanyRelationModel,
  ContactPersonCompanyRelationSaveArgsModel
> {
  constructor(
    @Inject(CustomerServiceKey)
    protected readonly customerService: CustomerService,
    @Inject(ContactPersonServiceKey)
    protected readonly contactPersonService: ContactPersonService,
  ) {
    super();
  }

  createEntity(): ContactPersonCompanyRelationModel {
    return new ContactPersonCompanyRelation();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: ContactPersonCompanyRelationSaveArgsModel,
    entity: ContactPersonCompanyRelationModel,
  ): Promise<ContactPersonCompanyRelationModel> {
    entity.role = args.role;
    entity.isActive = args.isActive;
    entity.contactPerson = await this.contactPersonService.loadEntityById(
      transactionalEntityManager,
      args.contactPersonId,
    );
    entity.customer = await this.customerService.loadEntityById(
      transactionalEntityManager,
      args.customerId,
    );
    return entity;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<ContactPersonCompanyRelationModel> {
    return transactionalEntityManager.getRepository(
      ContactPersonCompanyRelation,
    ) as Repository<ContactPersonCompanyRelationModel>;
  }

  typeName(): string {
    return ContactPersonCompanyRelationServiceKey;
  }
}
