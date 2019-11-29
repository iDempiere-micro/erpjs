import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { VendorInvoiceModel, VendorInvoiceVatModel } from '@erpjs/model';
import { VendorInvoice } from '@erpjs/data';

@Entity()
@ObjectType()
export class VendorInvoiceVat extends EntityBase implements VendorInvoiceVatModel {
  displayName = '';

  @Field(type => VendorInvoice)
  @ManyToOne(type => VendorInvoice, vendorInvoice => vendorInvoice.vatReport, { nullable: false })
  invoice: Promise<VendorInvoiceModel>;

  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  vatRatePercent: number;

  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  vatTotalAccountingSchemeCurrency: number;
}
