import { BaseModel } from '../entities/base.model';
import { BaseSaveArgsModel } from '../args/base.save.args.model';
import { BaseService } from './base.service';
import { Injector } from '../injector';

export interface BaseEntityService<T extends BaseModel, S extends BaseSaveArgsModel> {
  createEntity(): Promise<T>;
  loadEntity(id: number): Promise<T>;
  loadEntities(): Promise<Array<T>>;
  save(args:S): Promise<T>;
  persist(T);
  delete(T);
}

export abstract class BaseEntityServiceImplementation<T extends BaseModel, S extends BaseSaveArgsModel>
  extends BaseService implements BaseEntityService<T, S> {

  loadEntities: () => Promise<T[]>;
  getInjector: () => Injector;
  createEntity: () => Promise<T>;
  loadEntity: (id) => Promise<T>;
  persist: (e:T) => Promise<void>;
  delete: (e:T) => Promise<void>;
  protected abstract async doSave(args: S, entity: T): Promise<T>;

  async save(args: S): Promise<T> {
    const entity =
      args.id ? await this.loadEntity(args.id) : await this.createEntity();
    return await this.doSave(args, entity);
  }
}
