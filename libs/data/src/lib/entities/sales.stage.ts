import { EntityBase } from '@erp/data/src/lib/entities/shared/EntityBase';
import { CustomerOrderModel, SalesStageModel } from '@erpjs/model';
import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { CustomerOrder } from '@erp/data/src/lib/entities/customer.order';

@Entity()
@ObjectType()
export class SalesStage extends EntityBase implements SalesStageModel {
  @Column()
  @Field()
  displayName: string;

  @Field(type => [CustomerOrder], { nullable: true })
  @OneToMany(type => CustomerOrder, order => order.salesStage)
  orders: Promise<Array<CustomerOrderModel>>;
}
