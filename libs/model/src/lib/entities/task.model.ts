import { WorkLogModel } from './work.log.model';
import { BaseModel } from './base.model';
import { ProductQuantityPriceTaxModel } from '../helpers/product.quantity.price.tax.model';
import { CustomerModel } from './customer.model';
import { UserModel } from './user.model';
import { ProjectModel } from './project.model';
import { ProspectModel } from './prospect.model';

export interface TaskModel extends BaseModel {
  workLogs: Promise<Array<WorkLogModel>>;
  invoiceLines: Promise<Array<ProductQuantityPriceTaxModel>>;
  dueDate: Date;
  customer?: Promise<CustomerModel>;
  description: string;
  completed: boolean;
  owner: Promise<UserModel>;
  responsible: Promise<UserModel>;
  predecessors: Promise<Array<TaskModel>>;
  project?: Promise<ProjectModel>;
  prospect?: Promise<ProspectModel>;
}
