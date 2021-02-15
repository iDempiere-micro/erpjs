import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Currency } from './Currency';
import { CurrencyRateModel } from '../../lib/currency.rate.model';
import { User } from './User';
import { Field } from '@nestjs/graphql';
import { UserModel } from '../../lib/user.model';

@Entity('currency_rate', { schema: 'public' })
export class CurrencyRate implements CurrencyRateModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
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
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  isCurrent: boolean;

  @Column('double precision', {
    name: 'currencyMultiplyingRate',
  })
  currencyMultiplyingRate: number;

  @Column('date', { name: 'end' })
  end: Date;

  @Column('date', { name: 'start' })
  start: Date;

  @ManyToOne(
    () => Currency,
    currency => currency.currencyRates,
  )
  @JoinColumn([{ name: 'fromId', referencedColumnName: 'id' }])
  from: Currency;

  @ManyToOne(
    () => Currency,
    currency => currency.currencyRates2,
  )
  @JoinColumn([{ name: 'toId', referencedColumnName: 'id' }])
  to: Currency;
}
