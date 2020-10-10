import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';

export const DateServiceKey = 'DateService';

@Injectable()
export class DateService {
  now = (user: UserModel): Date => new Date();
}
