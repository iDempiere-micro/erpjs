import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address';
import { CountryModel } from '../../lib/country.model';
import { euMembersISOCodes } from '../../lib/euMembersISOCodes';
import { Field, ObjectType } from '@nestjs/graphql';

@Index('IDX_06db3c87e9e1b9eba96918b308', ['displayName'], { unique: true })
@Index('UQ_6eba1a52ee121d100c8a0a6510c', ['isoCode'], { unique: true })
@Entity('country', { schema: 'public' })
@ObjectType()
export class Country implements CountryModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  @Field()
  updtTs: Date;

  @Column('integer', { name: 'updtOpId', default: () => '0' })
  @Field()
  updtOpId: number;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  @Field()
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  @Field()
  isCurrent: boolean;

  @Column('character varying', { name: 'displayName' })
  @Field()
  displayName: string;

  @Column('character varying', { name: 'isoCode', unique: true })
  @Field()
  isoCode: string;

  @OneToMany(
    () => Address,
    address => address.country,
  )
  addresses: Address[];

  get isEUMember(): boolean {
    return euMembersISOCodes.indexOf(this.isoCode) >= 0;
  }
}
