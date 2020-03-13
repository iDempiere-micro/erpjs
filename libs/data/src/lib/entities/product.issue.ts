import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from '@erp/data/src/lib/entities/shared/EntityBase';
import { CustomerOrderModel, ProductIssueLineModel, ProductIssueModel, WarehouseModel } from '@erpjs/model';
import { ProductIssueLine } from '@erp/data/src/lib/entities/product.issue.line';
import { Tax } from '@erpjs/data';
import { Warehouse } from '@erp/data/src/lib/entities/warehouse';
import { CustomerOrder } from '@erp/data/src/lib/entities/customer.order';

@Entity()
@ObjectType()
export class ProductIssue extends EntityBase implements ProductIssueModel {
  @Column({default: false})
  @Field()
  isConfirmed: boolean;

  @Column()
  @Field()
  issueDate: Date;

  @Field(type => Warehouse)
  @ManyToOne(type => Warehouse, warehouse => warehouse.productIssues, { nullable: false })
  warehouse: Promise<WarehouseModel>;

  @Column()
  @Field()
  displayName: string;

  @Field(type => [ProductIssueLine], { nullable: true })
  @OneToMany(type => ProductIssueLine, productIssueLine => productIssueLine.productIssue)
  lines: Promise<ProductIssueLineModel[]>;

  @Field(type => CustomerOrder)
  @ManyToOne(type => CustomerOrder, customerOrder => customerOrder.productIssues, { nullable: false })
  customerOrder: Promise<CustomerOrderModel>;
}
