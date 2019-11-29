import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { AddressModel, VendorModel } from '@erpjs/model';
import { Address } from './address';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';

@Entity()
@ObjectType()
export class Vendor extends UniqueDisplayEntityBase implements VendorModel {

  @Column()
  @Field()
  invoicingEmail: string;

  @Field(type => Address)
  @ManyToOne(type => Address, address => address.vendorRegistratedAddresses, { nullable: false })
  legalAddress: Promise<AddressModel>;

  @Column()
  @Field()
  @Index({unique: true})
  legalName: string;

  @Column({nullable: true})
  @Field({nullable: true})
  @Index({unique: true})
  vatNumber?: string;
}
