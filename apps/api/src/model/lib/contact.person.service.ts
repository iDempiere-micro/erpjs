import { BaseEntityService } from './base.entity.service';
import { ContactPersonSaveArgsModel } from './contact.person.save.args.model';
import { ContactPersonModel } from './contact.person.model';
import { EntityManager, Repository } from 'typeorm';
import { ContactPerson } from '../generated/entities/ContactPerson';

export const ContactPersonServiceKey = 'ContactPersonService';

export class ContactPersonService extends BaseEntityService<
  ContactPersonModel,
  ContactPersonSaveArgsModel
> {
  createEntity(): ContactPersonModel {
    return new ContactPerson();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: ContactPersonSaveArgsModel,
    entity: ContactPersonModel,
  ): Promise<ContactPersonModel> {
    entity.firstName = args.firstName;
    entity.lastName = args.lastName;

    return entity;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<ContactPersonModel> {
    return transactionalEntityManager.getRepository(ContactPerson) as Repository<ContactPersonModel>;
  }

  typeName(): string {
    return ContactPersonServiceKey;
  }
}
