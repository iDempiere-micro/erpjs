import { AttachmentModel } from '../../lib/attachment.model';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  ListItemObject,
  ListItemPrefix,
} from '../../../../../../absorb/SMCloudStore/core/src/StorageProvider';

@ObjectType()
export class CloudFile implements ListItemObject {
  @Field()
  contentMD5: string;
  @Field()
  contentSHA1: string;
  @Field()
  contentType: string;
  @Field()
  creationTime: Date;
  @Field()
  lastModified: Date;
  @Field()
  path: string;
  @Field()
  size: number;
}

@ObjectType()
export class CloudFolder implements ListItemPrefix {
  @Field()
  prefix: string;
}

@ObjectType()
export class CloudListResults {
  @Field(()=>[CloudFile])
  files: Array<ListItemObject>;
  @Field(()=>[CloudFolder])
  folders: Array<ListItemPrefix>
}


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
