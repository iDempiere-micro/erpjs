import { EntityBase } from './shared/EntityBase';
import { SalesInvoiceVatModel } from '@erpjs/model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { SalesInvoice } from './sales.invoice';

@Entity()
@ObjectType()
export class SalesInvoiceVat extends EntityBase implements SalesInvoiceVatModel {
  @Field(type => SalesInvoice)
  @ManyToOne(type => SalesInvoice, salesInvoice => salesInvoice.vatReport, { nullable: false })
  invoice: Promise<SalesInvoice>;

  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  vatRatePercent: number;

  @Column( {type: 'float8'})
  @Field()
  vatTotalAccountingSchemeCurrencyRaw: number;

  @Column( {type: 'float8'})
  @Field()
  vatTotalRaw: number;

  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  vatTotalAccountingSchemeCurrency: number;

  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  vatTotal: number;

}
