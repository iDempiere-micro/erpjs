import { ContactPersonCompanyRelationModel } from '../../lib/contact.person.company.relation.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ContactPersonModel } from '../../lib/contact.person.model';
import { CustomerModel } from '../../lib/customer.model';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { User } from './User';
import { UserModel } from '../../lib/user.model';
import { ContactPerson } from './ContactPerson';
import { Customer } from './Customer';

@Entity('contactPersonCompanyRelation', { schema: 'public' })
@ObjectType()
export class ContactPersonCompanyRelation
  implements ContactPersonCompanyRelationModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  @Field(() => DateTimeScalarType)
  updtTs: Date;

  @ManyToOne(
    () => User,
    user => user.updAccountingSchemes,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'updtOpId', referencedColumnName: 'id' }])
  @Field(() => User)
  updtOp: UserModel;

  @ManyToOne(
    () => ContactPerson,
    contactPerson => contactPerson.contactPersonCompanyRelations,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'contactPersonId', referencedColumnName: 'id' }])
  @Field(() => ContactPerson)
  contactPerson: ContactPersonModel;

  @ManyToOne(
    () => Customer,
    customer => customer.contactPersonCompanyRelations,
    { nullable: false, eager: false },
  )
  @JoinColumn([{ name: 'customerId', referencedColumnName: 'id' }])
  @Field(() => Customer)
  customer: CustomerModel;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  @Field()
  isActive: boolean;

  @Column('character varying', { name: 'role' })
  @Field()
  role: string;
}
