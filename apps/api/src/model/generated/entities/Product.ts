import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SalesInvoiceLine } from './SalesInvoiceLine';

@Index('IDX_826d69dcc65d9650be67af6d48', ['displayName'], { unique: true })
@Index('IDX_34f6ca1cd897cc926bdcca1ca3', ['sku'], { unique: true })
@Entity('product', { schema: 'public' })
export class Product {
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

  @Column('character varying', { name: 'sku' })
  sku: string;

  @OneToMany(
    () => SalesInvoiceLine,
    salesInvoiceLine => salesInvoiceLine.product,
  )
  salesInvoiceLines: SalesInvoiceLine[];
}
