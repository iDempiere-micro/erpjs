import { CustomerProductPriceModel } from '../../lib/customer.product.price.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from './Product';
import { ProductModel } from '../../lib/product.model';
import { CustomerPriceList } from './CustomerPriceList';
import { CustomerPriceListModel } from '../../lib/customer.price.list.model';

@Entity('customerProductPrice', { schema: 'public' })
@ObjectType()
export class CustomerProductPrice implements CustomerProductPriceModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: number;

  @Field(() => Product)
  @ManyToOne(
    () => Product,
    product => product.customerProductPrices,
    { nullable: false, eager: true },
  )
  product: ProductModel;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  sellingPrice: number;

  @ManyToOne(
    () => CustomerPriceList,
    customerPriceList => customerPriceList.productPrices,
    { nullable: false },
  )
  customerPriceList: CustomerPriceListModel;
}
