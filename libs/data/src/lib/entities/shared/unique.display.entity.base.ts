import { EntityBase } from './EntityBase';
import { Column, Index } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export abstract class UniqueDisplayEntityBase extends EntityBase {
  @Column()
  @Field()
  @Index({unique: true})
  displayName: string;
}
