import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { AddressModel } from '../../lib/address.model';
import { CountryModel } from '../../lib/country.model';
import { CustomerModel } from '../../lib/customer.model';
import { OrganizationModel } from '../../lib/organization.model';
import { UserModel } from '../../lib/user.model';
import { Country } from './Country';
import { Customer } from './Customer';
import { Organization } from './Organization';
import { User } from './User';

@Entity('address', { schema: 'public' })
@ObjectType()
export class Address implements AddressModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
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

  @Column('character varying', { name: 'line1' })
  @Field()
  line1: string;

  @Column('character varying', { name: 'city' })
  @Field()
  city: string;

  @Column('character varying', { name: 'zipCode' })
  @Field()
  zipCode: string;

  @ManyToOne(() => Country, (country) => country.addresses, {
    nullable: false,
    eager: true,
  })
  @JoinColumn([{ name: 'countryId', referencedColumnName: 'id' }])
  @Field(() => Country)
  country: CountryModel;

  @OneToMany(() => Customer, (customer) => customer.legalAddress)
  customers: CustomerModel[];

  @OneToMany(() => Customer, (customer) => customer.address)
  customers1: CustomerModel[];

  @OneToMany(() => Organization, (organization) => organization.legalAddress)
  organizations: OrganizationModel[];
}
