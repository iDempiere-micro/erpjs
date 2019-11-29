import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { SuspectModel, TaskModel } from '@erpjs/model';
import { Prospect } from './prospect';
import { Task } from './task';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';

@Entity()
@ObjectType()
export class Suspect extends UniqueDisplayEntityBase implements SuspectModel{
  @Field()
  @Column()
  description: string;
  @Field({nullable: true})
  @Column({nullable: true})
  url: string;

  @Field(type => [Prospect], { nullable: true })
  @OneToMany(type => Prospect, prospect => prospect.originated)
  prospects: Promise<Array<Prospect>>;

  @Field(type => [Task], { nullable: true })
  @OneToMany(type => Task, task => task.suspect)
  tasks: Promise<Array<TaskModel>>;
}
