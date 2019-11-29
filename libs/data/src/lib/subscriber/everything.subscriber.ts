import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { HistoryService } from '../services/history.service';
import { LoadEvent } from 'typeorm/subscriber/event/LoadEvent';
import { UserServiceImplementation } from '@erpjs/data';

@Injectable()
export class EverythingSubscriber implements EntitySubscriberInterface {
  static allowInsertUpdateWithoutUser = false;

    constructor(
        readonly connection: Connection,
        readonly historyService: HistoryService,
    ) {
        connection.subscribers.push(this);
    }

    updateUpdtOpId(entity) {
      const user = UserServiceImplementation.currentUser();
      if (!user && !EverythingSubscriber.allowInsertUpdateWithoutUser) throw new Error('Every transaction must run in a user context.');
      if (user && entity) entity.updtOpId = user.id
    }

    beforeInsert(event: InsertEvent<any>) {
      this.updateUpdtOpId(event.entity);
    }

    beforeUpdate(event: UpdateEvent<any>) {
      this.updateUpdtOpId(event.entity);
    }

    /* TODO: think through
    beforeRemove(event: RemoveEvent<any>) {
        // console.log(`BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
        throw Error('Can\'t delete from ' + event.entity + ' entity !');
    }*/

    async afterInsert(event: InsertEvent<any>) {
        const entity = event.entity;
        await this.historyService.saveHistoryRecord(entity, 'afterInsert', event.manager);
    }

    async afterUpdate(event: UpdateEvent<any>) {
        const entity = event.entity;
        await this.historyService.saveHistoryRecord(entity, 'afterUpdate', event.manager);
    }

    // removing from entity must be avoided, so commenting out this part...
    // afterRemove(event: RemoveEvent<any>) {
    //     console.log(`AFTER ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
    // }

    async afterLoad(entity: any, event: LoadEvent<any>) {
        // ? Journal events based on this ?
        // This needs to be commented out because we did not know now who is running the cron jobs
        // await this.permissionsService.checkPermissions(event.manager, entity);
    }
}
