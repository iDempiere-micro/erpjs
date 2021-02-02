import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountingScheme } from './AccountingScheme';
import { CurrencyRate } from './CurrencyRate';
import { SalesInvoice } from './SalesInvoice';
import { Field, ObjectType } from '@nestjs/graphql';

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
  @Field()
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

  @Column('character varying', { name: 'displayName' })
  @Field()
  displayName: string;

  @Column('character varying', { name: 'isoCode' })
  @Field()
  isoCode: string;

  @OneToMany(
    () => AccountingScheme,
    accountingScheme => accountingScheme.currency,
  )
  accountingSchemes: AccountingScheme[];

  @OneToMany(
    () => CurrencyRate,
    currencyRate => currencyRate.from,
  )
  currencyRates: CurrencyRate[];

  @OneToMany(
    () => CurrencyRate,
    currencyRate => currencyRate.to,
  )
  currencyRates2: CurrencyRate[];

  @OneToMany(
    () => SalesInvoice,
    salesInvoice => salesInvoice.currency,
  )
  salesInvoices: SalesInvoice[];
}
