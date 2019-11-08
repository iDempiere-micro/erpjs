import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { ProductModel } from '@erpjs/model';
import { Account } from './account';
import { SalesInvoiceLine } from './sales.invoice.line';

@Entity()
@ObjectType()
export class Product extends EntityBase implements ProductModel {
  @Field(type => Account)
  @ManyToOne(type => Account, account => account.productsBought, { nullable: false })
  buyingAccount: Promise<Account>;

  @Column()
  @Field()
  @Index({unique: true})
  displayName: string;

  @Field(type => Account)
  @ManyToOne(type => Account, account => account.productsSold, { nullable: false })
  sellingAccount: Promise<Account>;

  @Field(type => [SalesInvoiceLine], { nullable: true })
  @OneToMany(type => SalesInvoiceLine, salesInvoiceLine => salesInvoiceLine.product)
  salesInvoiceLine: Promise<Array<SalesInvoiceLine>>;

  @Column()
  @Field()
  @Index({unique: true})
  sku: string;
}
