import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { TaskModel } from '@erpjs/model';
import { AppUser, Customer } from '@erpjs/data';
import { SalesInvoiceLine } from './sales.invoice.line';
import { WorkLog } from './work.log';

@Entity()
@ObjectType()
export class Task extends EntityBase implements TaskModel {
  @Field()
  @Column({default: false})
  completed: boolean;

  @Field(type => Customer)
  @ManyToOne(type => Customer, customer => customer.tasks, { nullable: false })
  customer: Promise<Customer>;

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
}
