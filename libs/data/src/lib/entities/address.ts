import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { AddressModel, CountryModel } from '@erpjs/model';
import { Country } from './country';
import { Customer } from './customer';
import { Organization } from './organization';

@Entity()
@ObjectType()
export class Address extends EntityBase implements AddressModel {
  @Field(type => Country)
  @ManyToOne(type => Country, country => country.addresses, { nullable: false })
  country: Promise<CountryModel>;

  get displayName(): string {
    return `${this.line1}, ${this.zipCode} ${this.city}`;
  }

  @Column()
  @Field()
  line1: string;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  zipCode: string;

  @Field(type => [Customer], { nullable: true })
  @OneToMany(type => Customer, customer => customer.legalAddress)
  customerRegistratedAddresses: Promise<Array<Customer>>;

  @Field(type => [Organization], { nullable: true })
  @OneToMany(type => Organization, organization => organization.legalAddress)
  organizationRegistratedAddresses: Promise<Array<Organization>>;
}
