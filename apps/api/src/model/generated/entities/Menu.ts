import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountingScheme } from './AccountingScheme';
import { CurrencyRate } from './CurrencyRate';
import { SalesInvoice } from './SalesInvoice';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './User';
import { UserModel } from '../../lib/user.model';
import { AccountingSchemeModel } from '../../lib/accounting.scheme.model';
import { MenuItem } from './MenuItem';

@Index('IDX_displayName_menu', ['displayName'], { unique: true })
@Entity('menu', { schema: 'public' })
@ObjectType()
export class Menu {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  @Field()
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
  @Field()
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  @Field()
  isCurrent: boolean;

  @Column('character varying', { name: 'displayName' })
  @Field()
  displayName: string;

  @OneToMany(
    () => MenuItem,
    menuItem => menuItem.menu,
    { eager: true },
  )
  @Field(() => [MenuItem])
  items: MenuItem[];
}
