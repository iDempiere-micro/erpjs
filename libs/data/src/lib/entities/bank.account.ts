import { BankAccountModel, BankModel, RecurringSalesInvoiceModel } from '@erpjs/model';
import { Bank } from './bank';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { SalesInvoice } from './sales.invoice';
import { Organization } from './organization';
import { VendorInvoice } from '@erpjs/data';
import { RecurringSalesInvoice } from './recurring.sales.invoice';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';

@Entity()
@ObjectType()
export class BankAccount extends UniqueDisplayEntityBase implements BankAccountModel {
  @Column()
  @Field()
  iban: string;

  @Column()
  @Field()
  swift: string;
  @Field(type => Bank)
  @ManyToOne(type => Bank, bank => bank.bankAccounts, { nullable: false })
  bank: Promise<BankModel>;

  @Column()
  @Field()
  bankAccountCustomerPrintableNumber: string;

  @Field(type => [SalesInvoice], { nullable: true })
  @OneToMany(type => SalesInvoice, salesInvoice => salesInvoice.bankAccount)
  salesInvoices: Promise<Array<SalesInvoice>>;

  @Field(type => [RecurringSalesInvoice], { nullable: true })
  @OneToMany(type => RecurringSalesInvoice, recurringSalesInvoice => recurringSalesInvoice.bankAccount)
  recurringSalesInvoices: Promise<Array<RecurringSalesInvoiceModel>>;

  @Field(type => [Organization], { nullable: true })
  @OneToMany(type => Organization, organization => organization.bankAccount)
  organizations: Promise<Array<Organization>>;

  @Field(type => [VendorInvoice], { nullable: true })
  @OneToMany(type => VendorInvoice, vendorInvoice => vendorInvoice.bankAccount)
  vendorInvoices: Promise<Array<VendorInvoice>>;
}
