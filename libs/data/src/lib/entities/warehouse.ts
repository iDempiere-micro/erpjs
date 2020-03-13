import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from '@erp/data/src/lib/entities/shared/EntityBase';
import {
  AddressModel,
  ProductIssueModel,
  ProductReceiptLineModel,
  ProductReceiptModel,
  WarehouseModel
} from '@erpjs/model';
import { Address } from '@erp/data/src/lib/entities/address';
import { ProductReceiptLine } from '@erp/data/src/lib/entities/product.receipt.line';
import { ProductReceipt } from '@erp/data/src/lib/entities/product.receipt';
import { ProductIssue } from '@erp/data/src/lib/entities/product.issue';

@Entity()
@ObjectType()
export class Warehouse extends EntityBase implements WarehouseModel {
  @Field(type => Address)
  @ManyToOne(type => Address, address => address.customerRegistratedAddresses, { nullable: false })
  address: Promise<AddressModel>;

  @Field()
  @Column()
  displayName: string;

  @Field(type => [ProductReceipt], { nullable: true })
  @OneToMany(type => ProductReceipt, productReceipt => productReceipt.warehouse)
  productReceipts: Promise<ProductReceiptModel[]>;

  @Field(type => [ProductIssue], { nullable: true })
  @OneToMany(type => ProductIssue, productIssue => productIssue.warehouse)
  productIssues: Promise<ProductIssueModel[]>;

}
