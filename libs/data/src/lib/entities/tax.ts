import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { TaxModel } from '@erpjs/model';
import { SalesInvoiceLine } from './sales.invoice.line';
import { RecurringSalesInvoiceLine } from './recurring.sales.invoice.line';
import { ProductReceiptLine } from '@erp/data/src/lib/entities/product.receipt.line';

@Entity()
@ObjectType()
export class Tax extends EntityBase implements TaxModel {
  @Column()
  @Field()
  displayName: string;

  @Column()
  @Field()
  ratePercent: number;

  @Column()
  @Field()
  isStandard: boolean;

  @OneToMany(type => SalesInvoiceLine, salesInvoiceLine => salesInvoiceLine.lineTax)
  salesInvoiceLine: Promise<Array<SalesInvoiceLine>>;

  @OneToMany(type => ProductReceiptLine, productReceiptLine => productReceiptLine.lineTax)
  productReceiptLine: Promise<Array<ProductReceiptLine>>;

  @OneToMany(type => RecurringSalesInvoiceLine,
      recurringSalesInvoiceLine => recurringSalesInvoiceLine.lineTax)
  recurringSalesInvoiceLine: Promise<Array<RecurringSalesInvoiceLine>>;
}
