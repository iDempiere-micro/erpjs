import { BaseModel, OrganizationModel } from '@erpjs/model';
import { TaskModel } from './task.model';

export interface ProjectModel extends BaseModel {
  owner: Promise<OrganizationModel>;
  tasks: Promise<Array<TaskModel>>;
}
