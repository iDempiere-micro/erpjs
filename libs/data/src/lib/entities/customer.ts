import { CustomerModel } from '@erpjs/model';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Address } from './address';
import { SalesInvoice } from './sales.invoice';
import { CalendarActivity } from './calendar.activity';
import { Task } from './task';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';

@Entity()
@ObjectType()
export class Customer extends UniqueDisplayEntityBase implements CustomerModel {
  @Field(type => Address)
  @ManyToOne(type => Address, address => address.customerRegistratedAddresses, { nullable: false })
  legalAddress: Promise<Address>;

  @Column()
  @Field()
  @Index({unique: true})
  legalName: string;

  @Column({nullable: true})
  @Field({nullable: true})
  @Index({unique: true})
  vatNumber?: string;

  @Field(type => [SalesInvoice], { nullable: true })
  @OneToMany(type => SalesInvoice, salesInvoice => salesInvoice.customer)
  salesInvoices: Promise<Array<SalesInvoice>>;

  @Field(type => [CalendarActivity], { nullable: true })
  @OneToMany(type => CalendarActivity, calendarActivity => calendarActivity.customer)
  calendarActivities: Promise<Array<CalendarActivity>>;

  @Field(type => [Task], { nullable: true })
  @OneToMany(type => Task, task => task.customer)
  tasks: Promise<Array<Task>>;

  @Column()
  @Field()
  invoicingEmail: string;

  @Column()
  @Field()
  idNumber: string;
}
