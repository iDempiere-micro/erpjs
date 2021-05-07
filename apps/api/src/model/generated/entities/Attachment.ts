import { AttachmentModel } from '../../lib/attachment.model';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * This is just the link between a real attachment and our entity
 */
@Entity('attachment', { schema: 'public' })
@ObjectType()
export class Attachment implements AttachmentModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column('character varying', { name: 'contentUrl' })
  @Field()
  @Index()
  contentUrl: string;

  content: any;

  @Column('character varying', { name: 'displayName' })
  @Field()
  @Index()
  displayName: string;
}
