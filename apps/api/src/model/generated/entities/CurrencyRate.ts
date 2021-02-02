import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Currency } from './Currency';
import { CurrencyRateModel } from '../../lib/currency.rate.model';

@Entity('currency_rate', { schema: 'public' })
export class CurrencyRate implements CurrencyRateModel {
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
