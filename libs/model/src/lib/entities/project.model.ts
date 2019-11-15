import { TaskModel } from './task.model';
import { BaseModel } from './base.model';
import { OrganizationModel } from './organization.model';

export interface ProjectModel extends BaseModel {
  owner: Promise<OrganizationModel>;
  tasks: Promise<Array<TaskModel>>;
}
