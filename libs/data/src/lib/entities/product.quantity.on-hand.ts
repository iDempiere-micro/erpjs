import { EntityBase } from '@erp/data/src/lib/entities/shared/EntityBase';
import { ProductModel, ProductQuantityOnHandModel, WarehouseModel } from '@erpjs/model';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Product } from '@erpjs/data';
import { Warehouse } from '@erp/data/src/lib/entities/warehouse';

@Entity()
@ObjectType()
export class ProductQuantityOnHand extends EntityBase implements ProductQuantityOnHandModel {
  displayName = '';

  @Field(type => Product)
  @OneToOne(type => Product, product => product.productQuantityOnHand, { nullable: false })
  product: Promise<ProductModel>;

  @Column( {type: 'float8', default: 0})
  @Field()
  quantity: number;

  @Field(type => Warehouse)
  @OneToMany(type => Product, product => product.productQuantityOnHand, { nullable: false })
  warehouse: Promise<WarehouseModel>
}
