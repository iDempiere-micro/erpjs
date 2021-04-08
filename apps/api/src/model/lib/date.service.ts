import { Injectable } from '@nestjs/common';

export const DateServiceKey = 'DateService';

@Injectable()
export class DateService {
  now = (): Date => new Date();
}
