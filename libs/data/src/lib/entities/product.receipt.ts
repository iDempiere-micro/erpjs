import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from '@erp/data/src/lib/entities/shared/EntityBase';
import { ProductReceiptLineModel, ProductReceiptModel, WarehouseModel } from '@erpjs/model';
import { ProductReceiptLine } from '@erp/data/src/lib/entities/product.receipt.line';
import { Tax } from '@erpjs/data';
import { Warehouse } from '@erp/data/src/lib/entities/warehouse';

@Entity()
@ObjectType()
export class ProductReceipt extends EntityBase implements ProductReceiptModel {
  @Column({default: false})
  @Field()
  isConfirmed: boolean;

  @Column()
  @Field()
  receiptDate: Date;

  @Field(type => Warehouse)
  @ManyToOne(type => Warehouse, warehouse => warehouse.productReceipts, { nullable: false })
  warehouse: Promise<WarehouseModel>;

  @Column()
  @Field()
  displayName: string;

  @Field(type => [ProductReceiptLine], { nullable: true })
  @OneToMany(type => ProductReceiptLine, productReceiptLine => productReceiptLine.productReceipt)
  lines: Promise<ProductReceiptLineModel[]>;
}
