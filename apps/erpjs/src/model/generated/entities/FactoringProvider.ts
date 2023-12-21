import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BankAccount } from './BankAccount';
import { SalesInvoice } from './SalesInvoice';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './User';
import { UserModel } from '../../lib/user.model';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { BankAccountModel } from '../../lib/bank.account.model';
import { FactoringProviderModel } from '../../lib/factoring.provider.model';
import { FactoringContract } from './FactoringContract';

@Index('IDX_factoringProvider_displayName', ['displayName'], { unique: true })
@Entity('factoringProvider', { schema: 'public' })
@ObjectType()
export class FactoringProvider implements FactoringProviderModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  @Field(() => DateTimeScalarType)
  updtTs: Date;

  @ManyToOne(
    () => User,
    user => user.updAccountingSchemes,
    { nullable: false, eager: true },
  )
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

  @ManyToOne(
    () => BankAccount,
    bankAccount => bankAccount.factoringProviders,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'bankAccountId', referencedColumnName: 'id' }])
  @Field(() => BankAccount)
  bankAccount: BankAccountModel;

  @OneToMany(
    () => SalesInvoice,
    salesInvoice => salesInvoice.factoringProvider,
  )
  salesInvoices: SalesInvoice[];

  @OneToMany(
    () => FactoringContract,
    factoringContract => factoringContract.factoringProvider,
  )
  factoringContracts: FactoringContract[];
}
