import { LanguageModel } from './language.model';
import { Injectable } from '@nestjs/common';
import { BaseEntityService } from './base.entity.service';
import { LanguageSaveArgsModel } from './language.save.args.model';
import { Language } from '../generated/entities/Language';
import { EntityManager } from 'typeorm';
import { Repository } from 'typeorm';

export const LanguagesServiceKey = 'LanguagesService';

@Injectable()
export class LanguagesService extends BaseEntityService<
  LanguageModel,
  LanguageSaveArgsModel
> {
  typeName(): string {
    return LanguagesServiceKey;
  }
  createEntity(): LanguageModel {
    return new Language();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: LanguageSaveArgsModel,
    entity: LanguageModel,
  ): Promise<LanguageModel> {
    entity.isoCode = args.isoCode;
    entity.displayName = args.displayName;
    return entity;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<LanguageModel> {
    return transactionalEntityManager.getRepository(Language);
  }
}
