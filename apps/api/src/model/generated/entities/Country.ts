import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { CountryModel } from '../../lib/country.model';
import { euMembersISOCodes } from '../../lib/euMembersISOCodes';
import { UserModel } from '../../lib/user.model';
import { Address } from './Address';
import { User } from './User';

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

  @Column('character varying', { name: 'isoCode', unique: true })
  @Field()
  isoCode: string;

  @OneToMany(() => Address, (address) => address.country)
  addresses: Address[];

  get isEUMember(): boolean {
    return euMembersISOCodes.indexOf(this.isoCode) >= 0;
  }
}
