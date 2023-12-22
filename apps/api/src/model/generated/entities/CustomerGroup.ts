import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { User } from './User';
import { UserModel } from '../../lib/user.model';
import { CustomerGroupModel } from '../../lib/customer.group.model';
import { CustomerPriceListModel } from '../../lib/customer.price.list.model';
import { CustomerModel } from '../../lib/customer.model';
import { Customer } from './Customer';
import { CustomerPriceList } from './CustomerPriceList';

@Index('IDX_customerGroup_displayName', ['displayName'], { unique: true })
@Entity('customerGroup', { schema: 'public' })
@ObjectType()
export class CustomerGroup implements CustomerGroupModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  @Field(() => DateTimeScalarType)
  updtTs: Date;

  @ManyToOne(() => User, (user) => user.updAccountingSchemes, {
    nullable: false,
    eager: true,
  })
  @JoinColumn([{ name: 'updtOpId', referencedColumnName: 'id' }])
  @Field(() => User)
  updtOp: UserModel;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  @Field()
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  @Field()
  isCurrent: boolean;

  @Column('character varying', { name: 'displayName' })
  @Field()
  displayName: string;

  @Field(() => [Customer], { nullable: true })
  @OneToMany(() => Customer, (customer) => customer.customerGroup)
  customers: Array<CustomerModel>;

  @OneToMany(
    () => CustomerPriceList,
    (customerPriceList) => customerPriceList.customerGroup,
  )
  @Field(() => [CustomerPriceList], { nullable: true })
  customerPriceLists: Array<CustomerPriceListModel>;
}
