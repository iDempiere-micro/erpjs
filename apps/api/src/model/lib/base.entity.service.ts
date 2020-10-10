import { BaseModel } from './base.model';
import { BaseSaveArgsModel } from './base.save.args.model';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { getService } from './module.reference.service';
import {
  SaveArgsValidationService,
  SaveArgsValidationServiceKey,
} from './save.args.validation.service';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

export abstract class BaseEntityService<
  T extends BaseModel,
  S extends BaseSaveArgsModel
> {
  abstract createEntity(): T;
  protected abstract getRepository(
    transactionalEntityManager: EntityManager
  ): Repository<T>;
  protected abstract async doSave(
    transactionalEntityManager: EntityManager,
    args: S,
    entity: T
  ): Promise<T>;

  abstract typeName(): string;

  loadEntityById = async (
    transactionalEntityManager: EntityManager,
    id: number,
    relations?: string[]
  ): Promise<T> =>
    await this.getRepository(transactionalEntityManager).findOne({
      where: { id },
      relations,
    });

  loadEntity = async (
    transactionalEntityManager: EntityManager,
    options: FindOneOptions<T>,
  ): Promise<T> =>
    await this.getRepository(transactionalEntityManager).findOne(
      options,
    );

  createQueryBuilder = (
    transactionalEntityManager: EntityManager,
    alias: string,
  ) : SelectQueryBuilder<T> =>
    this.getRepository(transactionalEntityManager).createQueryBuilder(alias);

  loadEntities = async (
    transactionalEntityManager: EntityManager,
    options?: FindManyOptions<T>
  ): Promise<Array<T>> =>
    await this.getRepository(transactionalEntityManager).find(options);

  async save(transactionalEntityManager: EntityManager, args: S): Promise<T> {
    const saveArgsValidationService: SaveArgsValidationService = getService(
      SaveArgsValidationServiceKey
    );
    await saveArgsValidationService.checkIsSaveArgValid(
      transactionalEntityManager,
      this.typeName(),
      args
    );

    const entity = args.id
      ? await this.loadEntityById(transactionalEntityManager, args.id)
      : await this.createEntity();
    return await this.getRepository(transactionalEntityManager).save(
      await this.doSave(transactionalEntityManager, args, entity)
    );
  }
  persist = async (
    transactionalEntityManager: EntityManager,
    t: T
  ): Promise<T> => await this.getRepository(transactionalEntityManager).save(t);
  delete = async (
    transactionalEntityManager: EntityManager,
    t: T
  ): Promise<void> => {
    await this.getRepository(transactionalEntityManager).remove(t);
  };
  reloadEntity = async (
    transactionalEntityManager: EntityManager,
    entity: T,
    relations?: string[]
  ): Promise<T> => ({
    ...entity,
    ...(await this.getRepository(transactionalEntityManager).findOne({
      where: { id: entity.id },
      relations,
    })),
  });
}
