import { OrganizationModel, ProjectModel, TaskModel } from '@erpjs/model';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Organization } from './organization';
import { Task } from '@erpjs/data';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';

@Entity()
@ObjectType()
export class Project extends UniqueDisplayEntityBase implements ProjectModel {

  @Field(type => Organization)
  @ManyToOne(type => Organization, organization => organization.documentNumberSequences, { nullable: false })
  owner: Promise<OrganizationModel>;

  @Field(type => [Task], { nullable: true })
  @OneToMany(type => Task, task => task.project)
  tasks: Promise<Array<TaskModel>>;
}
