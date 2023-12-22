import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SalesInvoiceLine } from './SalesInvoiceLine';
import { User } from './User';
import { Field } from '@nestjs/graphql';
import { UserModel } from '../../lib/user.model';

@Entity('tax', { schema: 'public' })
export class Tax {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
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
  displayName: string;

  @Column('integer', { name: 'ratePercent' })
  ratePercent: number;

  @Column('boolean', { name: 'isStandard' })
  isStandard: boolean;

  @OneToMany(
    () => SalesInvoiceLine,
    (salesInvoiceLine) => salesInvoiceLine.lineTax,
  )
  salesInvoiceLines: SalesInvoiceLine[];
}
