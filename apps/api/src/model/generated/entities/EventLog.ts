import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { EventLogModel } from '../../lib/eventLog.model';

@Entity('eventLog', { schema: 'public' })
@ObjectType()
export class EventLog implements EventLogModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column({
    type: 'jsonb',
  })
  @Field(() => String)
  content: any;

  @Column('character varying', { name: 'displayName' })
  @Field()
  @Index()
  displayName: string;
}
