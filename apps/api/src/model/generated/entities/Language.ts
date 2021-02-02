import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SalesInvoiceLine } from './SalesInvoiceLine';
import { LanguageModel } from '../../lib/language.model';

@Index('IDX_language_displayName', ['displayName'], { unique: true })
@Index('IDX_language_isoCode', ['isoCode'], { unique: true })
@Entity('language', { schema: 'public' })
export class Language implements LanguageModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  updtTs: Date;

  @Column('integer', { name: 'updtOpId', default: () => '0' })
  updtOpId: number;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  isCurrent: boolean;

  @Column('character varying', { name: 'displayName' })
  displayName: string;

  @Column('character varying', { name: 'isoCode' })
  isoCode: string;
}
