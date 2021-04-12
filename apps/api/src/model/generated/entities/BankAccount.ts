import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bank } from './Bank';
import { Organization } from './Organization';
import { SalesInvoice } from './SalesInvoice';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './User';
import { UserModel } from '../../lib/user.model';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { BankModel } from '../../lib/bank.model';

@Index('IDX_d13847b5db0cf66c1ea23615eb', ['displayName'], { unique: true })
@Entity('bank_account', { schema: 'public' })
@ObjectType()
export class BankAccount {
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

  @Column('character varying', { name: 'iban' })
  @Field()
  iban: string;

  @Column('character varying', { name: 'swift' })
  @Field()
  swift: string;

  @Column('character varying', { name: 'bankAccountCustomerPrintableNumber' })
  @Field()
  bankAccountCustomerPrintableNumber: string;

  @ManyToOne(
    () => Bank,
    bank => bank.bankAccounts,
  )
  @JoinColumn([{ name: 'bankId', referencedColumnName: 'id' }])
  @Field(()=>Bank)
  bank: BankModel;

  @OneToMany(
    () => Organization,
    organization => organization.bankAccount,
  )
  organizations: Organization[];

  @OneToMany(
    () => SalesInvoice,
    salesInvoice => salesInvoice.bankAccount,
  )
  salesInvoices: SalesInvoice[];
}
