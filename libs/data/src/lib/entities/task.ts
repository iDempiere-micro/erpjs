import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { ProjectModel, ProspectModel, SuspectModel, TaskModel } from '@erpjs/model';
import { AppUser, Customer, Prospect, Suspect } from '@erpjs/data';
import { SalesInvoiceLine } from './sales.invoice.line';
import { WorkLog } from './work.log';
import { Project } from './project';

@Entity()
@ObjectType()
export class Task extends EntityBase implements TaskModel {
  @Field()
  @Column({default: false})
  completed: boolean;

  @Field(type => Customer, { nullable: true })
  @ManyToOne(type => Customer, customer => customer.tasks, { nullable: true })
  customer?: Promise<Customer>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column()
  displayName: string;

  @Field()
  @Column()
  dueDate: Date;

  @Field(type => [SalesInvoiceLine], { nullable: true })
  @OneToMany(type => SalesInvoiceLine, salesInvoiceLine => salesInvoiceLine.task)
  invoiceLines: Promise<Array<SalesInvoiceLine>>;

  @Field(type => [WorkLog], { nullable: true })
  @OneToMany(type => WorkLog, workLog => workLog.task)
  workLogs: Promise<Array<WorkLog>>;

  @Field(type => AppUser)
  @ManyToOne(type => AppUser, appUser => appUser.owningTasks, { nullable: false })
  owner: Promise<AppUser>;

  @Field(type => AppUser)
  @ManyToOne(type => AppUser, appUser => appUser.solvingTasks, { nullable: false })
  responsible: Promise<AppUser>;

  @Field(type => Task)
  @JoinTable()
  @ManyToMany(type => Task)
  predecessors: Promise<Array<TaskModel>>;

  @Field(type => Project, { nullable: true })
  @ManyToOne(type => Project, project => project.tasks, { nullable: true })
  project?: Promise<ProjectModel>;

  @Field(type => Prospect, { nullable: true })
  @ManyToOne(type => Prospect, prospect => prospect.tasks, { nullable: true })
  prospect?: Promise<ProspectModel>;

  @Field(type => Suspect, { nullable: true })
  @ManyToOne(type => Suspect, suspect => suspect.tasks, { nullable: true })
  suspect?: Promise<SuspectModel>;
}
