import { BaseSaveArgsModel } from './base.save.args.model';
import { UserModel } from '../entities/user.model';
import { CustomerModel } from '../entities/customer.model';
import { ProspectModel } from '../entities/prospect.model';

export interface TaskSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  dueDate: Date;
  owner?: UserModel;
  ownerId?: number;
  responsible?: UserModel;
  responsibleId?: number;
  customer?: CustomerModel;
  customerId?: number;
  prospect?: ProspectModel;
  prospectId?: number;
}
