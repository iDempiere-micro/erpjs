import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from '../../lib/user.model';
import { SalesInvoiceLine } from './SalesInvoiceLine';
import { User } from './User';

@Entity('tax', { schema: 'public' })
@ObjectType()
export class Tax {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
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

  @Column('character varying', { name: 'displayName' })
  @Field()
  displayName: string;

  @Column('integer', { name: 'ratePercent' })
  @Field()
  ratePercent: number;

  @Column('boolean', { name: 'isStandard' })
  @Field()
  isStandard: boolean;

  @OneToMany(
    () => SalesInvoiceLine,
    (salesInvoiceLine) => salesInvoiceLine.lineTax,
  )
  salesInvoiceLines: SalesInvoiceLine[];
}
