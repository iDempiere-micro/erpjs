import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './Organization';
import { User } from './User';
import { UserToOrganizationModel } from '../../lib/user.to.organization.model';
import { UserModel } from '../../lib/user.model';
import { OrganizationModel } from '../../lib/organization.model';

@Entity('user_to_organization', { schema: 'public' })
export class UserToOrganization implements UserToOrganizationModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  updtTs: Date;

  @Column('integer', { name: 'updtOpId', default: () => '0' })
  updtOpId: number;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  isCurrent: boolean;

  @ManyToOne(
    () => Organization,
    organization => organization.userToOrganizations,
  )
  @JoinColumn([{ name: 'organizationId', referencedColumnName: 'id' }])
  organization: OrganizationModel;

  @ManyToOne(
    () => User,
    user => user.organizations,
  )
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: UserModel;
}
