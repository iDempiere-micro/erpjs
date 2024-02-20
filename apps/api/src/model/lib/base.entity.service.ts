import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { BaseModel } from './base.model';
import { BaseSaveArgsModel } from './base.save.args.model';
import { getService } from './module.reference.service';
import {
  SaveArgsValidationService,
  SaveArgsValidationServiceKey,
} from './save.args.validation.service';
import { UserModel } from './user.model';

export abstract class BaseEntityService<
  T extends BaseModel,
  S extends BaseSaveArgsModel,
> {
  abstract createEntity(): T;
  protected abstract getRepository(
    transactionalEntityManager: EntityManager,
  ): Repository<T>;
  protected abstract doSave(
    transactionalEntityManager: EntityManager,
    args: S,
    entity: T,
    currentUser: UserModel,
  ): Promise<T>;

  abstract typeName(): string;

  loadEntityByIdRelations(): string[] {
    return [];
  }

  loadEntityById = async (
    transactionalEntityManager: EntityManager,
    id: number,
    relations?: string[],
  ): Promise<T> =>
    await this.getRepository(transactionalEntityManager).findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      where: { id },
      relations: relations || this.loadEntityByIdRelations(),
    });

  loadEntity = async (
    transactionalEntityManager: EntityManager,
    options: FindOneOptions<T>,
  ): Promise<T> =>
    await this.getRepository(transactionalEntityManager).findOne(options);

  createQueryBuilder = (
    transactionalEntityManager: EntityManager,
    alias: string,
  ): SelectQueryBuilder<T> =>
    this.getRepository(transactionalEntityManager).createQueryBuilder(alias);

  loadEntities = async (
    transactionalEntityManager: EntityManager,
    options?: FindManyOptions<T>,
  ): Promise<Array<T>> =>
    await this.getRepository(transactionalEntityManager).find(options);

  async save(
    transactionalEntityManager: EntityManager,
    args: S,
    currentUser: UserModel,
  ): Promise<T> {
    const saveArgsValidationService: SaveArgsValidationService = getService(
      SaveArgsValidationServiceKey,
    );

    await saveArgsValidationService.checkIsSaveArgValid(
      transactionalEntityManager,
      this.typeName(),
      args,
    );

    if (!args) throw new Error('Args must be set when saving an entity');
    const entity = args.id
      ? await this.loadEntityById(transactionalEntityManager, args.id)
      : await this.createEntity();
    (entity as any).updtOp = currentUser;
    (entity as any).updtOpId = currentUser.id;
    const toBeSaved = await this.doSave(
      transactionalEntityManager,
      args,
      entity,
      currentUser,
    );
    (toBeSaved as any).updtOp = currentUser;
    (toBeSaved as any).updtOpId = currentUser.id;

    return await this.getRepository(transactionalEntityManager).save(toBeSaved);
  }
  persist = async (
    transactionalEntityManager: EntityManager,
    t: T,
    currentUser: UserModel,
  ): Promise<T> => {
    (t as any).updtOp = currentUser;
    (t as any).updtOpId = currentUser.id;
    return await this.getRepository(transactionalEntityManager).save(t);
  };

  delete = async (
    transactionalEntityManager: EntityManager,
    t: T,
  ): Promise<void> => {
    await this.getRepository(transactionalEntityManager).remove(t);
  };
  reloadEntity = async (
    transactionalEntityManager: EntityManager,
    entity: T,
    relations?: string[],
  ): Promise<T> => ({
    ...entity,
    ...(await this.getRepository(transactionalEntityManager).findOne({
      where: { id: entity.id },
      relations,
    })),
  });
}
