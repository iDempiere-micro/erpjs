import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { AccountingSchemeModel } from '../../lib/accounting.scheme.model';
import { AddressModel } from '../../lib/address.model';
import { BankAccountModel } from '../../lib/bank.account.model';
import { OrganizationModel } from '../../lib/organization.model';
import { UserModel } from '../../lib/user.model';
import { AccountingScheme } from './AccountingScheme';
import { Address } from './Address';
import { BankAccount } from './BankAccount';
import { DocumentNumberSequence } from './DocumentNumberSequence';
import { FactoringContract } from './FactoringContract';
import { SalesInvoice } from './SalesInvoice';
import { User } from './User';
import { UserToOrganization } from './UserToOrganization';

@Index('IDX_4177d3499a2c7edb42ead3d916', ['displayName'], { unique: true })
@Index('IDX_99ecb4de1fda7ee51fb91b3055', ['vatNumber'], { unique: true })
@Entity('organization', { schema: 'public' })
@ObjectType()
export class Organization implements OrganizationModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  @Field(() => DateTimeScalarType)
  updtTs: Date;

  @ManyToOne(() => User, (user) => user.updAccountingSchemes, {
    nullable: false,
    eager: true,
  })
  @JoinColumn([{ name: 'updtOpId', referencedColumnName: 'id' }])
  @Field(() => User)
  updtOp: UserModel;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  @Field()
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  @Field()
  isCurrent: boolean;

  @Column('character varying', { name: 'displayName' })
  @Field()
  displayName: string;

  @Column('character varying', { name: 'contact' })
  @Field()
  contact: string;

  @Column('character varying', { name: 'legalName' })
  @Field()
  legalName: string;

  @Column('character varying', { name: 'registration' })
  @Field()
  registration: string;

  @Column('character varying', { name: 'idNumber' })
  @Field()
  idNumber: string;

  @Column('character varying', { name: 'vatNumber', nullable: true })
  @Field({ nullable: true })
  vatNumber: string | null;

  @OneToMany(
    () => DocumentNumberSequence,
    (documentNumberSequence) => documentNumberSequence.organization,
  )
  @Field(() => DocumentNumberSequence)
  documentNumberSequences: DocumentNumberSequence[];

  @ManyToOne(
    () => AccountingScheme,
    (accountingScheme) => accountingScheme.organizations,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'accountingSchemeId', referencedColumnName: 'id' }])
  @Field(() => AccountingScheme)
  accountingScheme: AccountingSchemeModel;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.organizations, {
    nullable: false,
    eager: true,
  })
  @JoinColumn([{ name: 'bankAccountId', referencedColumnName: 'id' }])
  @Field(() => BankAccount)
  bankAccount: BankAccountModel;

  @ManyToOne(() => Address, (address) => address.organizations, {
    nullable: false,
    eager: true,
  })
  @JoinColumn([{ name: 'legalAddressId', referencedColumnName: 'id' }])
  @Field(() => Address)
  legalAddress: AddressModel;

  @OneToMany(() => SalesInvoice, (salesInvoice) => salesInvoice.organization)
  salesInvoices: SalesInvoice[];

  @OneToMany(
    () => UserToOrganization,
    (userToOrganization) => userToOrganization.organization,
  )
  userToOrganizations: UserToOrganization[];

  @OneToMany(
    () => FactoringContract,
    (factoringContract) => factoringContract.organization,
  )
  factoringContracts: FactoringContract[];
}
