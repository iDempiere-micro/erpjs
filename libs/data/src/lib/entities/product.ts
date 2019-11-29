import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { OpportunityModel, ProductModel } from '@erpjs/model';
import { Account } from './account';
import { SalesInvoiceLine } from './sales.invoice.line';
import { Opportunity } from '@erpjs/data';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';
import { RecurringSalesInvoiceLine } from './recurring.sales.invoice.line';

@Entity()
@ObjectType()
export class Product extends UniqueDisplayEntityBase implements ProductModel {
  @Field(type => Account)
  @ManyToOne(type => Account, account => account.productsBought, { nullable: false })
  buyingAccount: Promise<Account>;

  @Field(type => Account)
  @ManyToOne(type => Account, account => account.productsSold, { nullable: false })
  sellingAccount: Promise<Account>;

  @Field(type => [SalesInvoiceLine], { nullable: true })
  @OneToMany(type => SalesInvoiceLine, salesInvoiceLine => salesInvoiceLine.product)
  salesInvoiceLine: Promise<Array<SalesInvoiceLine>>;


  @Field(type => [RecurringSalesInvoiceLine], { nullable: true })
  @OneToMany(type => RecurringSalesInvoiceLine,
      recurringSalesInvoiceLine => recurringSalesInvoiceLine.product)
  recurringSalesInvoiceLine: Promise<Array<RecurringSalesInvoiceLine>>;


  @Column()
  @Field()
  @Index({unique: true})
  sku: string;

  @Field(type => [Opportunity], { nullable: true })
  @OneToMany(type => Opportunity, opportunity => opportunity.solution)
  opportunities: Promise<Array<OpportunityModel>>;
}
