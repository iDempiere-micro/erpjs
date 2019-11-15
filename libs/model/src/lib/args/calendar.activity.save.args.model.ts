import { BaseSaveArgsModel } from './base.save.args.model';
import { UserModel } from '../entities/user.model';
import { CustomerModel } from '../entities/customer.model';

export interface CalendarActivitySaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  customer: CustomerModel;
  start: Date;
  end: Date;
  owner: UserModel;
}
