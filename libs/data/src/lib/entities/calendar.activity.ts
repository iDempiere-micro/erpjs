import { EntityBase } from './shared/EntityBase';
import { CalendarActivityModel } from '@erpjs/model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { AppUser, Customer, Prospect } from '@erpjs/data';
import { DateTimeScalarType } from '../..';

@Entity()
@ObjectType()
export class CalendarActivity extends EntityBase implements CalendarActivityModel {

  @Field(type => Customer, { nullable: true })
  @ManyToOne(type => Customer, customer => customer.calendarActivities, { nullable: true })
  customer?: Promise<Customer>;

  @Field(type => Prospect, { nullable: true })
  @ManyToOne(type => Prospect, prospect => prospect.calendarActivities, { nullable: true })
  prospect?: Promise<Prospect>;


  @Field()
  @Column()
  displayName: string;


  @Field(type=>DateTimeScalarType)
  @Column()
  end: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field(type=>DateTimeScalarType)
  @Column()
  start: Date;

  @Field(type => AppUser)
  @ManyToOne(type => AppUser, appUser => appUser.ownCalendar, { nullable: false })
  owner: Promise<AppUser>;
}
