import { BaseEntityServiceImplementation } from './base.entity.service';
import { TaskModel } from '../entities/task.model';
import { TaskSaveArgsModel } from '../args/task.save.args.model';

export const TaskServiceKey = 'TaskService';

export class TaskService extends BaseEntityServiceImplementation<TaskModel, TaskSaveArgsModel> {
  protected async doSave(args: TaskSaveArgsModel, task: TaskModel): Promise<TaskModel> {
    const userService = this.getInjector().userService;

    task.displayName = args.displayName;
    task.dueDate = args.dueDate;
    task.completed = false;
    task.customer =
      Promise.resolve(
        args.customer ? args.customer :
          args.customerId ? (await this.getInjector().customerService.loadEntity(args.customerId)) : null
      );
    task.prospect =
      Promise.resolve(
        args.prospect ? args.prospect :
          args.prospectId ? (await this.getInjector().prospectService.loadEntity(args.prospectId)) : null
      );
    task.responsible = Promise.resolve(args.responsible ? args.responsible : await userService.loadEntity(args.responsibleId));
    task.owner = Promise.resolve(args.owner ? args.owner : await userService.loadEntity(args.ownerId));
    return task;
  }

  typeName(): string {
    return TaskServiceKey;
  }
}
