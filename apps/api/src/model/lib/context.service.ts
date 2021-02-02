import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { EntityManager } from 'typeorm';
import { User } from '../generated/entities/User';
import { Session } from '../../app/support/session';

export const ContextServiceKey = 'ContextService';

export interface Context {
  currentUser: UserModel;
  entityManager: EntityManager;
}

@Injectable()
export class ContextService {
  getCurrent(): Context {
    return (
      Session.get(ContextServiceKey) || {
        currentUser: undefined,
        entityManager: undefined,
      }
    );
  }
}

export async function run<T>(
  currentUser: User,
  entityManager: EntityManager,
  fn: () => T,
): Promise<T> {
  Session.createDefault();
  return Session.default.bind(async () => {
    try {
      Session.set(ContextServiceKey, {
        currentUser,
        entityManager,
      });
      return await fn();
    } finally {
      Session.set(ContextServiceKey, {
        currentUser: undefined,
        entityManager: undefined,
      });
    }
  })();
}
