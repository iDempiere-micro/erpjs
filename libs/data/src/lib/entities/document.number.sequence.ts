import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { Organization } from './organization';
import { OrganizationModel } from '@erpjs/model';

@Entity()
@ObjectType()
export class DocumentNumberSequence extends EntityBase {
  @Column()
  @Field()
  forType: string;

  @Column()
  @Field()
  current: number;

  @Field(type => Organization)
  @ManyToOne(type => Organization, organization => organization.documentNumberSequences, { nullable: false })
  organization: Promise<OrganizationModel>;
}
