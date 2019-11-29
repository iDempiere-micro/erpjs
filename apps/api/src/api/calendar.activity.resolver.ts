import { BaseEntityResolver } from './base.entity.resolver';
import { CalendarActivityModel, CalendarActivityService, CalendarActivityServiceKey } from '@erpjs/model';
import { CalendarActivitySaveArgs } from './args/calendar.activity.save.args';
import { Inject } from '@nestjs/common';
import { CalendarActivity } from '@erpjs/data';
import { Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';

export class CalendarActivityResolver
  extends BaseEntityResolver<CalendarActivityModel, CalendarActivitySaveArgs,
    CalendarActivityService> {

  getService(): CalendarActivityService {
    return this.calendarActivityService;
  }

  constructor(
    @Inject(CalendarActivityServiceKey) private readonly calendarActivityService : CalendarActivityService,
  ) { super(); }

  @Query(returns => [CalendarActivity])
  async calendarActivities(
    @CurrentUser() user,
  ) {
    return this.find(user);
  }
}
