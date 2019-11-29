import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { CurrencyModel, OrganizationModel, VendorInvoiceModel, VendorInvoiceVatModel } from '@erpjs/model';
import { BankAccount } from './bank.account';
import { Currency } from './currency';
import { Organization } from './organization';
import { VendorInvoiceVat } from './vendor.invoice.vat';

@Entity()
@ObjectType()
export class VendorInvoice extends EntityBase implements VendorInvoiceModel {
  @Field(type => BankAccount)
  @ManyToOne(type => BankAccount, bankAccount => bankAccount.vendorInvoices, { nullable: false })
  bankAccount: Promise<BankAccount>;

  @Field(type => Currency)
  @ManyToOne(type => Currency, currency => currency.vendorInvoices, { nullable: false })
  currency: Promise<CurrencyModel>;

  get displayName(): string {
    return `${this.documentNo}`;
  }

  @Column()
  @Field()
  documentNo: string;

  @Column({type:'date'})
  @Field()
  dueDate: Date;

  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  grandTotal: number;

  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  grandTotalAccountingSchemeCurrency: number;

  @Column()
  @Field()
  narration: string;

  @Field(type => Organization)
  @ManyToOne(type => Organization, organization => organization.vendorInvoices, { nullable: false })
  organization: Promise<OrganizationModel>;

  @Column({type:'date'})
  @Field()
  transactionDate: Date;

  @Field(type => [VendorInvoiceVat], { nullable: true })
  @OneToMany(type => VendorInvoiceVat, vendorInvoiceVat => vendorInvoiceVat.invoice)
  vatReport: Promise<Array<VendorInvoiceVatModel>>;

  @Column({type:'date'})
  @Field()
  issuedOn: Date;
}
