import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { CustomerProductPriceModel, ProductModel } from '@erpjs/model';
import { Product } from '@erpjs/data';
import { CustomerPriceList } from './customer.price.list';
import { EntityBase } from './shared/EntityBase';

@Entity()
@ObjectType()
export class CustomerProductPrice extends EntityBase implements CustomerProductPriceModel {
  displayName = '';

  @Field(type => Product)
  @ManyToOne(type => Product, product => product.customerProductPrices, { nullable: false })
  product: Promise<ProductModel>;

  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  sellingPrice: number;

  @ManyToOne(type => CustomerPriceList, customerPriceList => customerPriceList.productPrices, { nullable: false })
  customerPriceList: Promise<CustomerPriceList>;
}
