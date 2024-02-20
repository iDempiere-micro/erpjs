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
import { UserModel } from '../../lib/user.model';
import { AccountingScheme } from './AccountingScheme';
import { CurrencyRate } from './CurrencyRate';
import { SalesInvoice } from './SalesInvoice';
import { User } from './User';

@Index('IDX_215b85e32bfbe1cf9f1c47e14d', ['displayName'], { unique: true })
@Entity('currency', { schema: 'public' })
@ObjectType()
export class Currency {
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

  @Column('character varying', { name: 'isoCode' })
  @Field()
  isoCode: string;

  @OneToMany(
    () => AccountingScheme,
    (accountingScheme) => accountingScheme.currency,
  )
  accountingSchemes: AccountingScheme[];

  @OneToMany(() => CurrencyRate, (currencyRate) => currencyRate.from)
  currencyRates: CurrencyRate[];

  @OneToMany(() => CurrencyRate, (currencyRate) => currencyRate.to)
  currencyRates2: CurrencyRate[];

  @OneToMany(() => SalesInvoice, (salesInvoice) => salesInvoice.currency)
  salesInvoices: SalesInvoice[];
}
