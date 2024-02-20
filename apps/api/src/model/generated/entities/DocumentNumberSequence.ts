import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationModel } from '../../lib/organization.model';
import { UserModel } from '../../lib/user.model';
import { Organization } from './Organization';
import { User } from './User';

@Entity('document_number_sequence', { schema: 'public' })
@ObjectType()
export class DocumentNumberSequence {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  updtTs: Date;

  @ManyToOne(() => User, (user) => user.updAccountingSchemes, {
    nullable: false,
    eager: true,
  })
  @JoinColumn([{ name: 'updtOpId', referencedColumnName: 'id' }])
  @Field(() => User)
  updtOp: UserModel;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  isCurrent: boolean;

  @Column('character varying', { name: 'forType' })
  @Field()
  forType: string;

  @Column('integer', { name: 'current' })
  @Field()
  current: number;

  @ManyToOne(
    () => Organization,
    (organization) => organization.documentNumberSequences,
  )
  @JoinColumn([{ name: 'organizationId', referencedColumnName: 'id' }])
  organization: OrganizationModel;
}
