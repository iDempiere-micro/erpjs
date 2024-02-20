import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { CustomerModel } from '../../lib/customer.model';
import { FactoringContractModel } from '../../lib/factoring.contract.model';
import { FactoringProviderModel } from '../../lib/factoring.provider.model';
import { OrganizationModel } from '../../lib/organization.model';
import { UserModel } from '../../lib/user.model';
import { Customer } from './Customer';
import { FactoringProvider } from './FactoringProvider';
import { Organization } from './Organization';
import { User } from './User';

@Entity('factoringContract', { schema: 'public' })
@ObjectType()
export class FactoringContract implements FactoringContractModel {
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

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  @Field()
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  @Field()
  isCurrent: boolean;

  @Field(() => FactoringProvider)
  @ManyToOne(
    () => FactoringProvider,
    (factoringProvider) => factoringProvider.factoringContracts,
    { nullable: false },
  )
  factoringProvider: FactoringProviderModel;

  @Field(() => Customer)
  @ManyToOne(() => Customer, (customer) => customer.factoringContracts, {
    nullable: false,
  })
  customer: CustomerModel;

  @ManyToOne(
    () => Organization,
    (organization) => organization.factoringContracts,
    { nullable: false },
  )
  @JoinColumn([{ name: 'currencyId', referencedColumnName: 'id' }])
  @Field(() => Organization)
  organization: OrganizationModel;

  @Column('character varying', { name: 'invoicePrintNote' })
  @Field()
  invoicePrintNote: string;
}
