import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { CalendarActivityModel, TaskModel, UserModel, UserToOrganizationModel } from '@erpjs/model';
import { UserIdentity } from './user.identity';
import { UserToOrganization } from './user.to.organization';
import { Task } from './task';
import { CalendarActivity } from './calendar.activity';

@Entity()
@ObjectType()
export class AppUser extends EntityBase implements UserModel {
  get displayName() { return name; }

  @Index({unique: true})
  @Field({nullable: true})
  @Column({nullable: true})
  email?: string;

  @Index({unique: true})
  @Field({nullable: true})
  @Column({nullable: true})
  username?: string;

  @Index({unique: true})
  @Field({nullable: true})
  @Column({nullable: true})
  name?: string;

  @Field(type => [UserIdentity], { nullable: true })
  @OneToMany(type => UserIdentity, userIdentity => userIdentity.user)
  identities: Promise<Array<UserIdentity>>;

  @Field(type => [UserToOrganization], { nullable: true })
  @OneToMany(type => UserToOrganization, userToOrganization => userToOrganization.user)
  organizations: Promise<Array<UserToOrganizationModel>>;

  @Field(type => [Task], { nullable: true })
  @OneToMany(type => Task, task => task.owner)
  owningTasks: Promise<Array<TaskModel>>;

  @Field(type => [Task], { nullable: true })
  @OneToMany(type => Task, task => task.responsible)
  solvingTasks: Promise<Array<TaskModel>>;

  @Field(type => [CalendarActivity], { nullable: true })
  @OneToMany(type => CalendarActivity, calendarActivity => calendarActivity.owner)
  ownCalendar: Promise<Array<CalendarActivityModel>>;
}
