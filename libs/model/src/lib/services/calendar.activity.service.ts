import { BaseEntityServiceImplementation } from './base.entity.service';
import { CalendarActivityModel } from '../entities/calendar.activity.model';
import { CalendarActivitySaveArgsModel } from '../args/calendar.activity.save.args.model';

export const CalendarActivityServiceKey = 'CalendarActivityService';

export class CalendarActivityService extends BaseEntityServiceImplementation<CalendarActivityModel, CalendarActivitySaveArgsModel> {
  protected async doSave(args: CalendarActivitySaveArgsModel, entity: CalendarActivityModel): Promise<CalendarActivityModel> {
    entity.displayName = args.displayName;
    entity.customer = Promise.resolve(args.customer);
    entity.end = args.end;
    entity.start = args.start;
    entity.owner = Promise.resolve(args.owner);
    return entity;
  }

  typeName(): string {
    return CalendarActivityServiceKey;
  }

}
