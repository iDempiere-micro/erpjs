import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { ProductModel, ProductQuantityPriceTaxModel, TaxModel } from '@erpjs/model';
import { Tax } from './tax';
import { Product } from './product';
import { SalesInvoice } from '@erpjs/data';
import { RecurringSalesInvoice } from './recurring.sales.invoice';

@Entity()
@ObjectType()
export class RecurringSalesInvoiceLine extends EntityBase implements ProductQuantityPriceTaxModel {
  @Column( {type: 'float8'})
  @Field()
  linePrice: number;

  @Field(type => Tax)
  @ManyToOne(type => Tax, tax => tax.recurringSalesInvoiceLine, { nullable: false })
  lineTax: Promise<TaxModel>;

  @Column()
  @Field()
  narration: string;

  @Field(type => Product)
  @ManyToOne(type => Product, product => product.salesInvoiceLine, { nullable: false })
  product: Promise<ProductModel>;

  @Column( {type: 'float8'})
  @Field()
  quantity: number;

  @Field(type => RecurringSalesInvoice)
  @ManyToOne(type => RecurringSalesInvoice,
      recurringSalesInvoice => recurringSalesInvoice.lines, { nullable: false })
  invoice: Promise<SalesInvoice>;

}
