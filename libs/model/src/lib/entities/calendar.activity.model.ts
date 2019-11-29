import { BaseModel } from './base.model';
import { CustomerModel } from './customer.model';
import { UserModel } from './user.model';
import { ProspectModel } from './prospect.model';

export interface CalendarActivityModel extends BaseModel {
  start: Date;
  end: Date;
  location: string;
  customer?: Promise<CustomerModel>;
  owner: Promise<UserModel>;
  prospect?: Promise<ProspectModel>;
}
