import { Inject, Injectable } from '@nestjs/common';
import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { ContextService, ContextServiceKey } from '../../model/lib/context.service';
import { User } from '../../model/generated/entities/User';
import { EntityManager } from 'typeorm';

@Injectable()
export class EverythingSubscriber implements EntitySubscriberInterface {
  private static allowInsertUpdateWithoutUser = false;

  constructor(
    private readonly connection: Connection,
    @Inject(ContextServiceKey) private readonly contextService: ContextService,
  ) {
    connection.subscribers.push(this);
  }

  static createTechnicalUser = async (manager: EntityManager) => {
    try {
      EverythingSubscriber.allowInsertUpdateWithoutUser = true;
      const user = new User();
      user.email = process.env.TECHNICAL_USER_EMAIL;
      await manager.save(user);
    } finally {
      EverythingSubscriber.allowInsertUpdateWithoutUser = false;
    }
  }

  updateUpdtOpId(entity) {
    const user = this.contextService.getCurrent().currentUser;
    if (!user && !EverythingSubscriber.allowInsertUpdateWithoutUser)
      throw new Error('Every transaction must run in a user context.');
    if (user && entity) {
      entity.updtOp = user;
      entity.updtOpId = user.id;
    }
  }

  beforeInsert(event: InsertEvent<any>) {
    this.updateUpdtOpId(event.entity);
  }

  beforeUpdate(event: UpdateEvent<any>) {
    this.updateUpdtOpId(event.entity);
  }
}
