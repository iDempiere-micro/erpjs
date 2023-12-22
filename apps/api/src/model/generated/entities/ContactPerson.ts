import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ContactPersonModel } from '../../lib/contact.person.model';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { User } from './User';
import { UserModel } from '../../lib/user.model';
import { ContactPersonCompanyRelationModel } from '../../lib/contact.person.company.relation.model';
import { ContactPersonCompanyRelation } from './ContactPersonCompanyRelation';

@Entity('contactPerson', { schema: 'public' })
@ObjectType()
export class ContactPerson implements ContactPersonModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
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

  @Index()
  @Field()
  @Column('character varying', { name: 'firstName' })
  firstName: string;

  @Index()
  @Field()
  @Column('character varying', { name: 'lastName' })
  lastName: string;

  @OneToMany(
    () => ContactPersonCompanyRelation,
    (contactPersonCompanyRelation) =>
      contactPersonCompanyRelation.contactPerson,
    { eager: false },
  )
  @Field(() => [ContactPersonCompanyRelation], { nullable: true })
  contactPersonCompanyRelations: ContactPersonCompanyRelationModel[];
}
