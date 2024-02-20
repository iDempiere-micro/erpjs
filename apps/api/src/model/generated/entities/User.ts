import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { AccountingSchemeModel } from '../../lib/accounting.scheme.model';
import { SalesInvoiceModel } from '../../lib/sales.invoice.model';
import { UserIdentityModel } from '../../lib/user.identity.model';
import { UserModel } from '../../lib/user.model';
import { UserToOrganizationModel } from '../../lib/user.to.organization.model';
import { AccountingScheme } from './AccountingScheme';
import { SalesInvoice } from './SalesInvoice';
import { UserIdentity } from './UserIdentity';
import { UserToOrganization } from './UserToOrganization';

@Index('IDX_e12875dfb3b1d92d7d7c5377e2', ['email'], { unique: true })
@Index('IDX_065d4d8f3b5adb4a08841eae3c', ['name'], { unique: true })
@Index('IDX_78a916df40e02a9deb1c4b75ed', ['username'], { unique: true })
@Entity('user', { schema: 'public' })
@ObjectType()
export class User implements UserModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  @Field(() => DateTimeScalarType)
  updtTs: Date;

  @Column('integer', { name: 'updtOpId', default: () => '0' })
  @Field()
  updtOpId: number;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  @Field()
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  @Field()
  isCurrent: boolean;

  @Column('character varying', { name: 'email', nullable: true })
  @Field({ nullable: true })
  email: string | null;

  @Column('character varying', { name: 'username', nullable: true })
  @Field({ nullable: true })
  username: string | null;

  @Column('character varying', { name: 'name', nullable: true })
  @Field({ nullable: true })
  name: string | null;

  @OneToMany(() => UserIdentity, (userIdentity) => userIdentity.user)
  identities: UserIdentityModel[];

  @OneToMany(
    () => UserToOrganization,
    (userToOrganization) => userToOrganization.user,
  )
  organizations: UserToOrganizationModel[];

  @OneToMany(() => SalesInvoice, (salesInvoice) => salesInvoice.updtOp)
  updSalesInvoices: SalesInvoiceModel[];

  @OneToMany(
    () => AccountingScheme,
    (accountingScheme) => accountingScheme.updtOp,
  )
  updAccountingSchemes: AccountingSchemeModel[];
}
