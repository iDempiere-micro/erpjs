import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';
import { CustomerGroupModel, CustomerModel } from '@erpjs/model';
import { Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Customer } from '@erpjs/data';
import { CustomerPriceList } from './customer.price.list';

@Entity()
@ObjectType()
export class CustomerGroup extends UniqueDisplayEntityBase implements CustomerGroupModel {
  @Field(type => [Customer], { nullable: true })
  @OneToMany(type => Customer, customer => customer.customerGroup)
  customers: Promise<Array<CustomerModel>>;

  @OneToMany(type => CustomerPriceList, customerPriceList => customerPriceList.customerGroup)
  customerPriceLists: Promise<Array<CustomerPriceList>>
}
