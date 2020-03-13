import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { CountryModel } from '@erpjs/model';
import { Address } from './address';
import { VatRegistration } from './vat.registration';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';

const euMembersISOCodes = [
  'BE', 'EL', 'LT', 'PT',
  'BG',	'ES', 'LU', 'RO',
  'CZ', 'FR', 'HU', 'SI',
  'DK', 'HR', 'MT', 'SK',
  'DE', 'IT', 'NL', 'FI',
  'EE', 'CY', 'AT', 'SE',
  'IE', 'LV', 'PL', 'UK'
];

@Entity()
@ObjectType()
export class Country extends UniqueDisplayEntityBase implements CountryModel {
  get isEUMember(): boolean {
    return euMembersISOCodes.indexOf(this.isoCode) >= 0
  }

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
