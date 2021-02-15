import {
  Column,
  Entity,
  Index, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './User';
import { UserModel } from '../../lib/user.model';
import { Menu } from './Menu';

@Index('IDX_displayName_menuItem', ['displayName'], { unique: true })
@Entity('menu_item', { schema: 'public' })
@ObjectType()
export class MenuItem {
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

  @Column('character varying', { name: 'to' })
  @Field()
  to: string;

  @ManyToOne(
    () => Menu,
    menu => menu.items,
    { nullable: false, eager: false },
  )
  @JoinColumn([{ name: 'menuId', referencedColumnName: 'id' }])
  @Field(() => Menu)
  menu: Menu;
}
