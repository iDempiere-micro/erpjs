import { ProspectModel, SuspectModel, TaskModel } from '@erpjs/model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Task } from './task';
import { Suspect } from './suspect';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';
import { CalendarActivity } from './calendar.activity';

@Entity()
@ObjectType()
export class Prospect extends UniqueDisplayEntityBase implements ProspectModel {
  @Field()
  @Column()
  actionTaken: string;
  @Field()
  @Column()
  problem: string;
  @Field({nullable: true})
  @Column({nullable: true})
  url: string;

  @Field(type => Suspect)
  @ManyToOne(type => Suspect, suspect => suspect.prospects, { nullable: true })
  originated?: Promise<SuspectModel>;

  @Field(type => [Task], { nullable: true })
  @OneToMany(type => Task, task => task.prospect)
  tasks: Promise<Array<TaskModel>>;

  @Field(type => [CalendarActivity], { nullable: true })
  @OneToMany(type => CalendarActivity, calendarActivity => calendarActivity.prospect)
  calendarActivities: Promise<Array<CalendarActivity>>;

}
