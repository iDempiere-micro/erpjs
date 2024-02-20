import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerGroupModel } from '../../lib/customer.group.model';
import { CustomerPriceListModel } from '../../lib/customer.price.list.model';
import { CustomerProductPriceModel } from '../../lib/customer.product.price.model';
import { CustomerGroup } from './CustomerGroup';
import { CustomerProductPrice } from './CustomerProductPrice';

@Index('IDX_customerPriceList_displayName', ['displayName'], { unique: true })
@Entity('customerPriceList', { schema: 'public' })
@ObjectType()
export class CustomerPriceList implements CustomerPriceListModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: number;

  @Field(() => CustomerGroup)
  @ManyToOne(
    () => CustomerGroup,
    (customerGroupModel) => customerGroupModel.customerPriceLists,
    { nullable: false },
  )
  customerGroup: CustomerGroupModel;

  @Field()
  @Column()
  displayName: string;

  @Field(() => [CustomerProductPrice], { nullable: true })
  @OneToMany(
    () => CustomerProductPrice,
    (customerProductPrice) => customerProductPrice.customerPriceList,
  )
  productPrices: Array<CustomerProductPriceModel>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Index()
  validFrom: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Index()
  validTo: Date;
}
