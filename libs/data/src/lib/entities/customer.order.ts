import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from '@erp/data/src/lib/entities/shared/EntityBase';
import { AddressModel, CustomerOrderModel, ProductQuantityModel, SalesStageModel } from '@erpjs/model';
import { Currency, Customer, SalesInvoice } from '@erpjs/data';
import { Address } from '@erp/data/src/lib/entities/address';
import { OrderLine } from '@erp/data/src/lib/entities/order.line';
import { SalesStage } from '@erp/data/src/lib/entities/sales.stage';
import { ProductIssue } from '@erp/data/src/lib/entities/product.issue';

@Entity()
@ObjectType()
export class CustomerOrder extends EntityBase implements CustomerOrderModel {
  @Field(type => Currency)
  @ManyToOne(type => Currency, currency => currency.orders, { nullable: false })
  currency: Promise<Currency>;

  @Field(type => Customer)
  @ManyToOne(type => Customer, customer => customer.orders, { nullable: false })
  customer: Promise<Customer>;

  @Field(type => Address)
  @ManyToOne(type => Address, address => address.deliveryAddresses, { nullable: false })
  deliveryAddress: Promise<AddressModel>;

  @Column()
  @Field()
  displayName: string;

  @Column( {type: 'numeric', scale: 2, precision: 12, default: 0})
  @Field()
  grandTotal: number;

  @Column( {type: 'numeric', scale: 2, precision: 12, default: 0})
  @Field()
  grandTotalAccountingSchemeCurrency: number;


  @Column({default: false})
  @Field()
  isEditByCustomerPossible: boolean;

  @Field(type => [OrderLine], { nullable: true })
  @OneToMany(type => OrderLine, orderLine => orderLine.order)
  lines: Promise<Array<ProductQuantityModel>>;

  @Field(type => SalesStage)
  @ManyToOne(type => SalesStage, salesStage => salesStage.orders, { nullable: false })
  salesStage: Promise<SalesStageModel>;

  @Column( {type: 'float8', default: 0})
  @Field()
  totalLines: number;

  @Column( {type: 'float8', default: 0})
  @Field()
  totalLinesAccountingSchemeCurrency: number;

  @Field(type => [SalesInvoice], { nullable: true })
  @OneToMany(type => SalesInvoice, salesInvoice => salesInvoice.originalOrder)
  salesInvoices: Promise<Array<SalesInvoice>>;

  @Field(type => [ProductIssue], { nullable: true })
  @OneToMany(type => ProductIssue, productIssue => productIssue.customerOrder)
  productIssues: Promise<Array<ProductIssue>>;
}
