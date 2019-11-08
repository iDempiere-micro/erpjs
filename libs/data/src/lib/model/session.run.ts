import { AppUser, ModelModule, Session, UserServiceImplementation } from '@erpjs/data';
import { EverythingSubscriber } from '../subscriber/everything.subscriber';
import { EntityManager } from 'typeorm';

export async function run<T>(user:AppUser, entityManager: EntityManager, fn: ()=>T) {
  Session.createDefault();
  return Session.default.bind(
    async () => {
      UserServiceImplementation.setCurrentUser(user);
      ModelModule.setEntityManager(entityManager);
      const result = await fn();
      UserServiceImplementation.clearCurrentUser();
      ModelModule.setEntityManager(null);
      return result;
    }
  )();
}

export async function runJob<T>(entityManager: EntityManager,fn: ()=>T) {
  Session.createDefault();
  return Session.default.bind(
    async () => {
      EverythingSubscriber.allowInsertUpdateWithoutUser = true;
      ModelModule.setEntityManager(entityManager);
      const result = await fn();
      EverythingSubscriber.allowInsertUpdateWithoutUser = false;
      ModelModule.setEntityManager(null);
      return result;
    }
  )();
}
