import { CalendarActivityService } from '@erpjs/model';
import { Implement } from './base.service.implementation';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarActivityServiceImplementation
  extends Implement(CalendarActivityService) {
}

