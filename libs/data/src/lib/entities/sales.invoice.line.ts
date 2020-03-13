import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { ProductModel, TaskModel, TaxModel } from '@erpjs/model';
import { Product } from './product';
import { SalesInvoice } from './sales.invoice';
import { Tax } from './tax';
import { Task } from './task';

@Entity()
@ObjectType()
export class SalesInvoiceLine extends EntityBase {
  /* Sales line start
 */
  @Column()
  @Field()
  lineOrder: number;

  @Field(type => Tax)
  @ManyToOne(type => Tax, tax => tax.salesInvoiceLine, { nullable: false })
  lineTax: Promise<TaxModel>;

  @Column( {type: 'float8'})
  @Field()
  linePrice: number;

  @Field(type => Product)
  @ManyToOne(type => Product, product => product.salesInvoiceLine, { nullable: false })
  product: Promise<ProductModel>;

  @Column( {type: 'float8'})
  @Field()
  quantity: number;

  @Field(type => Task)
  @ManyToOne(type => Task, task => task.invoiceLines, { nullable: true })
  task: Promise<TaskModel>;

  @Column()
  @Field()
  narration: string;
  /* Sales line end
 */

  @Field(type => SalesInvoice)
  @ManyToOne(type => SalesInvoice, salesInvoice => salesInvoice.lines, { nullable: false })
  invoice: Promise<SalesInvoice>;
}
