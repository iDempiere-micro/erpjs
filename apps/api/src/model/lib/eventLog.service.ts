import { EntityManager, Repository } from 'typeorm';
import { EventLogModel } from './eventLog.model';
import { EventLogSaveArgsModel } from './eventLog.save.args.model';
import { BaseEntityService } from './base.entity.service';
import { EventLog } from '../generated/entities/EventLog';

export const EventLogServiceKey = 'EventLogService';

export class EventLogService extends BaseEntityService<
  EventLogModel,
  EventLogSaveArgsModel
> {
  createEntity(): EventLogModel {
    return new EventLog();
  }

  protected getRepository(
    transactionalEntityManager,
  ): Repository<EventLogModel> {
    return transactionalEntityManager.getRepository(EventLog);
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: EventLogSaveArgsModel,
    eventLog: EventLogModel,
  ): Promise<EventLogModel> {
    eventLog.displayName = args.displayName;
    eventLog.content = args.content;
    return eventLog;
  }

  typeName(): string {
    return EventLogServiceKey;
  }
}
