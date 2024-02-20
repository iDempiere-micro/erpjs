import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { Address } from '../../model/generated/entities/Address';

export interface HasNote {
  note: string;
}

@Entity('address', { schema: 'public' })
@ObjectType('address')
export class CustomAddress extends Address implements HasNote {
  @Column({ nullable: true })
  @Field({ nullable: true })
  note: string;
}
