import { Column, ManyToOne } from 'typeorm';
import { Field } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { ProductModel, ProductQuantityPriceTaxModel, TaskModel, TaxModel } from '@erpjs/model';
import { Product } from './product';
import { Tax } from './tax';
import { Task } from './task';

export abstract class SalesLine extends EntityBase implements ProductQuantityPriceTaxModel {
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
}
