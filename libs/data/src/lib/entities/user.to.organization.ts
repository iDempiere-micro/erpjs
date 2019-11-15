import { EntityBase } from './shared/EntityBase';
import { UserToOrganizationModel } from '@erpjs/model';
import { Organization } from './organization';
import { AppUser } from '@erpjs/data';
import { Field, ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class UserToOrganization extends EntityBase implements UserToOrganizationModel {
  @Field(type => Organization)
  @ManyToOne(type => Organization, organization => organization.users, { nullable: false })
  organization: Promise<Organization>;

  @Field(type => AppUser)
  @ManyToOne(type => AppUser, appUser => appUser.organizations, { nullable: false })
  user: Promise<AppUser>;

  displayName: '';
}
