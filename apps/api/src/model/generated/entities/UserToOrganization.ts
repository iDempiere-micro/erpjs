import { Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationModel } from '../../lib/organization.model';
import { UserModel } from '../../lib/user.model';
import { UserToOrganizationModel } from '../../lib/user.to.organization.model';
import { Organization } from './Organization';
import { User } from './User';

@Entity('user_to_organization', { schema: 'public' })
export class UserToOrganization implements UserToOrganizationModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  updtTs: Date;

  @ManyToOne(() => User, (user) => user.updAccountingSchemes, {
    nullable: false,
    eager: true,
  })
  @JoinColumn([{ name: 'updtOpId', referencedColumnName: 'id' }])
  @Field(() => User)
  updtOp: UserModel;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  isCurrent: boolean;

  @ManyToOne(
    () => Organization,
    (organization) => organization.userToOrganizations,
  )
  @JoinColumn([{ name: 'organizationId', referencedColumnName: 'id' }])
  organization: OrganizationModel;

  @ManyToOne(() => User, (user) => user.organizations)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: UserModel;
}
