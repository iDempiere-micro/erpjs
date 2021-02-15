import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SalesInvoice } from './SalesInvoice';
import { SalesInvoiceVatModel } from '../../lib/sales.invoice.vat.model';
import { SalesInvoiceModel } from '../../lib/sales.invoice.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './User';
import { UserModel } from '../../lib/user.model';

@Entity('sales_invoice_vat', { schema: 'public' })
@ObjectType()
export class SalesInvoiceVat implements SalesInvoiceVatModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  @Field()
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

  @Column('numeric', { name: 'vatRatePercent', precision: 12, scale: 2 })
  @Field()
  vatRatePercent: number;

  @Column('double precision', {
    name: 'vatTotalAccountingSchemeCurrencyRaw',
  })
  @Field()
  vatTotalAccountingSchemeCurrencyRaw: number;

  @Column('double precision', { name: 'vatTotalRaw' })
  @Field()
  vatTotalRaw: number;

  @Column('numeric', {
    name: 'vatTotalAccountingSchemeCurrency',
    precision: 12,
    scale: 2,
  })
  @Field()
  vatTotalAccountingSchemeCurrency: number;

  @Column('numeric', { name: 'vatTotal', precision: 12, scale: 2 })
  @Field()
  vatTotal: number;

  @ManyToOne(
    () => SalesInvoice,
    salesInvoice => salesInvoice.vatReport,
  )
  @JoinColumn([{ name: 'invoiceId', referencedColumnName: 'id' }])
  invoice: SalesInvoiceModel;
}
