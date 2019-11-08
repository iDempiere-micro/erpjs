import { EntityBase } from './shared/EntityBase';
import { CustomerModel } from '@erpjs/model';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Address } from './address';
import { SalesInvoice } from './sales.invoice';

@Entity()
@ObjectType()
export class Customer extends EntityBase implements CustomerModel {
  @Column()
  @Field()
  @Index({unique: true})
  displayName: string;

  @Field(type => Address)
  @ManyToOne(type => Address, address => address.customerRegistratedAddresses, { nullable: true })
  legalAddress: Promise<Address>;

  @Column()
  @Field()
  @Index({unique: true})
  legalName: string;

  @Column({nullable: true})
  @Field({nullable: true})
  @Index({unique: true})
  vatNumber?: string;

  @Field(type => [SalesInvoice], { nullable: true })
  @OneToMany(type => SalesInvoice, salesInvoice => salesInvoice.customer)
  salesInvoices: Promise<Array<SalesInvoice>>;

  @Column()
  @Field()
  invoicingEmail: string;
}
