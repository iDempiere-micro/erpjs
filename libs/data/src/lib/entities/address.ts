import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { AddressModel, CountryModel, CustomerOrderModel, VendorModel, WarehouseModel } from '@erpjs/model';
import { Country } from './country';
import { Customer } from './customer';
import { Organization } from './organization';
import { Vendor } from './vendor';
import { CustomerOrder } from '@erp/data/src/lib/entities/customer.order';
import { Warehouse } from '@erp/data/src/lib/entities/warehouse';

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

  @Field(type => [Vendor], { nullable: true })
  @OneToMany(type => Vendor, vendor => vendor.legalAddress)
  vendorRegistratedAddresses: Promise<Array<VendorModel>>;

  @OneToMany(type => CustomerOrder, order => order.deliveryAddress)
  deliveryAddresses: Promise<Array<CustomerOrderModel>>;

  @Field(type => [Warehouse], { nullable: true })
  @OneToMany(type => Warehouse, warehouse => warehouse.address)
  warehouses: Promise<Array<WarehouseModel>>;

}
