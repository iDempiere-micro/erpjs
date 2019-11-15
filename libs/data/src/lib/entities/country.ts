import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { CountryModel } from '@erpjs/model';
import { Address } from './address';
import { VatRegistration } from './vat.registration';

@Entity()
@ObjectType()
export class Country extends EntityBase implements CountryModel {
  @Column()
  @Field()
  displayName: string;

  @Column({unique: true})
  @Field()
  isoCode: string;

  @Field(type => [Address], { nullable: true })
  @OneToMany(type => Address, address => address.country)
  addresses: Promise<Array<Address>>;

  @Field(type => [VatRegistration], { nullable: true })
  @OneToMany(type => VatRegistration, vatRegistration => vatRegistration.registeredIn)
  vatRegistrations: Promise<Array<VatRegistration>>;
}
