import { EntityBase } from '../entities/shared/EntityBase';
import { EntityManager } from 'typeorm';
import { BaseModel } from '@erpjs/model';

export async function findOneById<M extends BaseModel,E extends EntityBase>(
  manager: EntityManager, model:M, ECtor: new ()=> E): Promise<E> {
  if (!model || !model.id) return null;
  return await manager.getRepository(ECtor).findOne(model.id);
}
