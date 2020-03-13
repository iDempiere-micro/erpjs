import { Column, Entity, Index, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { OpportunityModel, ProductModel } from '@erpjs/model';
import { Account } from './account';
import { SalesInvoiceLine } from './sales.invoice.line';
import { Opportunity } from '@erpjs/data';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';
import { RecurringSalesInvoiceLine } from './recurring.sales.invoice.line';
import { CustomerProductPrice } from './customer.product.price';
import { ProductQuantityOnHand } from '@erp/data/src/lib/entities/product.quantity.on-hand';
import { ProductReceiptLine } from '@erp/data/src/lib/entities/product.receipt.line';
import { ProductIssueLine } from '@erp/data/src/lib/entities/product.issue.line';

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

  @Field(type => [CustomerProductPrice], { nullable: true })
  @OneToMany(type => CustomerProductPrice, customerProductPrice => customerProductPrice.product)
  customerProductPrices: Promise<Array<CustomerProductPrice>>;

  @Field(type => ProductQuantityOnHand)
  @OneToOne(type => ProductQuantityOnHand, productQuantityOnHand => productQuantityOnHand.product, { nullable: true })
  productQuantityOnHand: Promise<ProductModel>;

  @Field(type => [ProductReceiptLine], { nullable: true })
  @OneToMany(type => ProductReceiptLine, productReceiptLine => productReceiptLine.product)
  productReceiptLines: Promise<Array<ProductReceiptLine>>;

  @Field(type => [ProductIssueLine], { nullable: true })
  @OneToMany(type => ProductIssueLine, productIssueLine => productIssueLine.product)
  productIssueLines: Promise<Array<ProductIssueLine>>;
}
