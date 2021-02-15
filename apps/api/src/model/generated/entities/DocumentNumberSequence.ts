import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from './Organization';
import { OrganizationModel } from '../../lib/organization.model';
import { User } from './User';
import { Field } from '@nestjs/graphql';
import { UserModel } from '../../lib/user.model';

@Entity('document_number_sequence', { schema: 'public' })
export class DocumentNumberSequence {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  updtTs: Date;

  @ManyToOne(
    () => User,
    user => user.updAccountingSchemes,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'updtOpId', referencedColumnName: 'id' }])
  @Field(() => User)
  updtOp: UserModel;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  isCurrent: boolean;

  @Column('character varying', { name: 'forType' })
  forType: string;

  @Column('integer', { name: 'current' })
  current: number;

  @ManyToOne(
    () => Organization,
    organization => organization.documentNumberSequences,
  )
  @JoinColumn([{ name: 'organizationId', referencedColumnName: 'id' }])
  organization: OrganizationModel;
}
