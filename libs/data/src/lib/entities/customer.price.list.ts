import { EntityBase } from './shared/EntityBase';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { CustomerGroupModel, CustomerPriceListModel, CustomerProductPriceModel } from '@erpjs/model';
import { CustomerGroup } from './customer.group';
import { CustomerProductPrice } from './customer.product.price';

@Entity()
@ObjectType()
export class CustomerPriceList extends EntityBase implements CustomerPriceListModel {
  @Field(type => CustomerGroup)
  @ManyToOne(type => CustomerGroup, customerGroupModel => customerGroupModel.customerPriceLists, { nullable: false })
  customerGroup: Promise<CustomerGroupModel>;
  @Field()
  @Column()
  displayName: string;
  @Field(type => [CustomerProductPrice], { nullable: true })
  @OneToMany(type => CustomerProductPrice, customerProductPrice => customerProductPrice.customerPriceList)
  productPrices: Promise<Array<CustomerProductPriceModel>>;
  @Field({nullable: true})
  @Column({nullable: true})
  validFrom: Date;
  @Field({nullable: true})
  @Column({nullable: true})
  validTo: Date;
}
