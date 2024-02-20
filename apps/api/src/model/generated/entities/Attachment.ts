import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import {
  ListItemObject,
  ListItemPrefix,
} from '../../../../../../absorb/SMCloudStore/core/src/StorageProvider';
import { AttachmentModel } from '../../lib/attachment.model';

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
  @Field(() => [CloudFile])
  files: Array<ListItemObject>;
  @Field(() => [CloudFolder])
  folders: Array<ListItemPrefix>;
}

/**
 * This is just the link between a real attachment and our entity
 * To simplify frontend development we also map the cloud entities
 * to this class so that we do not have to return two different sets of data.
 */
@Entity('attachment', { schema: 'public' })
@ObjectType()
export class Attachment implements AttachmentModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field(() => String)
  id: number;

  @Column('character varying', { name: 'contentUrl' })
  @Index()
  contentUrl: string;

  /**
   * The real content from the cloud document when needed
   */
  content?: any;

  /**
   * Again, to make it simpler we return folders as same type of data
   */
  @Field()
  isFolder: boolean;

  /**
   * Cloud file creation time
   */
  @Field()
  creationTime?: Date;
  /**
   * Cloud file last modified
   */
  @Field()
  lastModified?: Date;

  /**
   * Cloud file content type
   */
  @Field()
  contentType?: string;

  /**
   * Cloud file size
   */
  @Field()
  size?: number;

  @Column('character varying', { name: 'displayName' })
  @Field()
  @Index()
  displayName: string;
}
