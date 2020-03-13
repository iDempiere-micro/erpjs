import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from '@erp/data/src/lib/entities/shared/EntityBase';
import { ProductModel, ProductMovementDirection, ProductIssueLineModel, TaxModel, WarehouseModel } from '@erpjs/model';
import { Product, Tax } from '@erpjs/data';
import { ProductIssue } from '@erp/data/src/lib/entities/product.issue';

@Entity()
@ObjectType()
export class ProductIssueLine extends EntityBase implements ProductIssueLineModel {
  moveDirection: ProductMovementDirection.issue;
  displayName = '';

  @Column( {type: 'float8'})
  @Field()
  linePrice: number;

  @Column()
  @Field()
  movementDate: Date;

  @Field(type => Product)
  @ManyToOne(type => Product, product => product.productIssueLines, { nullable: false })
  product: Promise<ProductModel>;

  @Column( {type: 'float8'})
  @Field()
  quantity: number;

  @Field(type => ProductIssue)
  @ManyToOne(type => ProductIssue, productIssue => productIssue.lines, { nullable: false })
  productIssue: Promise<ProductIssue>;
}
