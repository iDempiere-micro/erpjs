import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { WorkLogModel } from '@erpjs/model';
import { Task } from './task';

@Entity()
@ObjectType()
export class WorkLog extends EntityBase implements WorkLogModel {
  @Field()
  @Column()
  displayName: string;

  @Field()
  @Column()
  durationInMinutes: number;

  @Field(type => Task)
  @ManyToOne(type => Task, task => task.workLogs, { nullable: false })
  task: Promise<Task>;
}
