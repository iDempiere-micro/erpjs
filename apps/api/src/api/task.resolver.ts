import { BaseEntityResolver } from './base.entity.resolver';
import { TaskModel, TaskService, TaskServiceKey } from '@erpjs/model';
import { TaskSaveArgs } from './args/task.save.args';
import { Task } from '@erpjs/data';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';

export class TaskResolver
  extends BaseEntityResolver<TaskModel, TaskSaveArgs, TaskService> {

  getService(): TaskService {
    return this.taskService;
  }

  constructor(
    @Inject(TaskServiceKey) private readonly taskService : TaskService,
  ) { super(); }

  @Query(returns => [Task])
  async tasks(
    @CurrentUser() user,
  ) {
    return this.find(user);
  }

  @Mutation(returns => Task)
  async task(
    @Args('args') objData: TaskSaveArgs , @CurrentUser() user,
  ): Promise<TaskModel> {
    return this.save(user, objData);
  }
}
