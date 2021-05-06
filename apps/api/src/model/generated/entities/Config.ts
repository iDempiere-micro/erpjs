import { ConfigData, ConfigModel } from '../../lib/config.model';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('config', { schema: 'public' })
@ObjectType()
export class Config<T extends ConfigData> implements ConfigModel<T> {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column({
    type: 'jsonb',
  })
  @Field(() => String)
  content: T;

  @Column('character varying', { name: 'displayName' })
  @Field()
  @Index()
  displayName: string;
}
