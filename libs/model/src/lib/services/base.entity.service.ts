import { BaseModel, BaseSaveArgsModel } from '../..';

export interface BaseEntityService<T extends BaseModel, S extends BaseSaveArgsModel> {
  createEntity(): Promise<T>;
  loadEntity(id: number): Promise<T>;
  save(args:S): Promise<T>;
}
