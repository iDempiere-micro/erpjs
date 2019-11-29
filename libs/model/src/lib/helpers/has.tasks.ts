import { TaskModel } from '../entities/task.model';

export interface HasTasks {
  tasks: Promise<Array<TaskModel>>
}
