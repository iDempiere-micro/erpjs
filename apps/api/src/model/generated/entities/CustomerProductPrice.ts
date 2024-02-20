import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CurrencyModel } from '../../lib/currency.model';
import { CustomerPriceListModel } from '../../lib/customer.price.list.model';
import { CustomerProductPriceModel } from '../../lib/customer.product.price.model';
import { ProductModel } from '../../lib/product.model';
import { Currency } from './Currency';
import { CustomerPriceList } from './CustomerPriceList';
import { Product } from './Product';

@Entity('customerProductPrice', { schema: 'public' })
@ObjectType()
export class CustomerProductPrice implements CustomerProductPriceModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.customerProductPrices, {
    nullable: false,
  })
  product: ProductModel;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  sellingPrice: number;

  @ManyToOne(
    () => CustomerPriceList,
    (customerPriceList) => customerPriceList.productPrices,
    { nullable: false },
  )
  customerPriceList: CustomerPriceListModel;

  @ManyToOne(() => Currency, (currency) => currency.accountingSchemes)
  @JoinColumn([{ name: 'currencyId', referencedColumnName: 'id' }])
  @Field(() => Currency)
  currency: CurrencyModel;
}
