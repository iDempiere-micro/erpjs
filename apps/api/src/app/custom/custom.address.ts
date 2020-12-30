import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Address } from '../../model/generated/entities/Address';

export interface HasNote {
  note: string;
}

@Entity("address", { schema: "public" })
@ObjectType('address')
export class CustomAddress extends Address implements HasNote {
  @Column({ nullable: true })
  @Field({ nullable: true })
  note: string;
}
