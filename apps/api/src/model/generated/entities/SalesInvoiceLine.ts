import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { ProductModel } from '../../lib/product.model';
import { SalesInvoiceLineModel } from '../../lib/sales.invoice.line.model';
import { SalesInvoiceModel } from '../../lib/sales.invoice.model';
import { TaxModel } from '../../lib/tax.model';
import { UserModel } from '../../lib/user.model';
import { Product } from './Product';
import { SalesInvoice } from './SalesInvoice';
import { Tax } from './Tax';
import { User } from './User';

@Entity('sales_invoice_line', { schema: 'public' })
@ObjectType()
export class SalesInvoiceLine implements SalesInvoiceLineModel {
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

  @Column('integer', { name: 'lineOrder' })
  @Field()
  lineOrder: number;

  @Column('double precision', { name: 'linePrice' })
  @Field()
  linePrice: number;

  @Column('double precision', { name: 'quantity' })
  @Field()
  quantity: number;

  @Column('character varying', { name: 'narration' })
  @Field()
  narration: string;

  @ManyToOne(() => SalesInvoice, (salesInvoice) => salesInvoice.lines)
  @JoinColumn([{ name: 'invoiceId', referencedColumnName: 'id' }])
  invoice: SalesInvoiceModel;

  @ManyToOne(() => Tax, (tax) => tax.salesInvoiceLines, {
    nullable: false,
    eager: true,
  })
  @JoinColumn([{ name: 'lineTaxId', referencedColumnName: 'id' }])
  lineTax: TaxModel;

  @ManyToOne(() => Product, (product) => product.salesInvoiceLines, {
    nullable: false,
    eager: true,
  })
  @JoinColumn([{ name: 'productId', referencedColumnName: 'id' }])
  @Field(() => Product)
  product: ProductModel;
}
