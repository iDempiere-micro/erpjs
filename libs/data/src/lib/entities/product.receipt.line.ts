import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from '@erp/data/src/lib/entities/shared/EntityBase';
import { ProductModel, ProductMovementDirection, ProductReceiptLineModel, TaxModel, WarehouseModel } from '@erpjs/model';
import { Product, Tax } from '@erpjs/data';
import { ProductReceipt } from '@erp/data/src/lib/entities/product.receipt';

@Entity()
@ObjectType()
export class ProductReceiptLine extends EntityBase implements ProductReceiptLineModel {
  moveDirection: ProductMovementDirection.receipt;
  displayName = '';

  @Column( {type: 'float8'})
  @Field()
  linePrice: number;

  @Field(type => Tax)
  @ManyToOne(type => Tax, tax => tax.salesInvoiceLine, { nullable: false })
  lineTax: Promise<TaxModel>;

  @Column()
  @Field()
  movementDate: Date;

  narration = '';

  @Field(type => Product)
  @ManyToOne(type => Product, product => product.productReceiptLines, { nullable: false })
  product: Promise<ProductModel>;

  @Column( {type: 'float8'})
  @Field()
  quantity: number;

  @Column( {type: 'float8'})
  @Field()
  quantityOnHand: number;

  @Field(type => ProductReceipt)
  @ManyToOne(type => ProductReceipt, productReceipt => productReceipt.lines, { nullable: false })
  productReceipt: Promise<ProductReceipt>;
}
