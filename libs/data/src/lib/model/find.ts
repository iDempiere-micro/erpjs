import { BaseModel } from '@erpjs/model';
import { EntityBase } from '../entities/shared/EntityBase';
import { EntityManager } from 'typeorm';

export async function findOneById<M extends BaseModel,E extends EntityBase>(
  manager: EntityManager, model:M, ECtor: new ()=> E): Promise<E> {
  if (!model || !model.id) return null;
  return await manager.getRepository(ECtor).findOne(model.id);
}
