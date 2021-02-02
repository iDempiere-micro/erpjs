import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SalesInvoiceLine } from './SalesInvoiceLine';

@Entity('tax', { schema: 'public' })
export class Tax {
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

  @Column('integer', { name: 'ratePercent' })
  ratePercent: number;

  @Column('boolean', { name: 'isStandard' })
  isStandard: boolean;

  @OneToMany(
    () => SalesInvoiceLine,
    salesInvoiceLine => salesInvoiceLine.lineTax,
  )
  salesInvoiceLines: SalesInvoiceLine[];
}
