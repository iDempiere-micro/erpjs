import { Injectable } from '@nestjs/common';
import { TaskService } from '@erpjs/model';
import { Implement } from './base.service.implementation';

@Injectable()
export class TaskServiceImplementation extends Implement(TaskService) {}
