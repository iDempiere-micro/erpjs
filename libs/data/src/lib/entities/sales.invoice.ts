import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { SalesInvoiceModel, SalesInvoiceVatModel } from '@erpjs/model';
import { Customer } from './customer';
import { Organization } from './organization';
import { Currency } from './currency';
import { SalesInvoiceLine } from './sales.invoice.line';
import { BankAccount } from './bank.account';
import { SalesInvoiceVat } from './sales.invoice.vat';

@Entity()
@ObjectType()
export class SalesInvoice extends EntityBase implements SalesInvoiceModel {
  @Field(type => BankAccount)
  @ManyToOne(type => BankAccount, bankAccount => bankAccount.salesInvoices, { nullable: false })
  bankAccount: Promise<BankAccount>;

  @Column({type:'date'})
  @Field()
  dueDate: Date;

  @Column({type:'date'})
  @Field()
  issuedOn: Date;

  @Field(type => Organization)
  @ManyToOne(type => Organization, organization => organization.salesInvoices, { nullable: false })
  organization: Promise<Organization>;

  @Field(type => Currency)
  @ManyToOne(type => Currency, currency => currency.salesInvoices, { nullable: false })
  currency: Promise<Currency>;

  @Field(type => Customer)
  @ManyToOne(type => Customer, customer => customer.salesInvoices, { nullable: false })
  customer: Promise<Customer>;

  get displayName(): string {
    return this.isDraft ? `#${this.id}` : `${this.documentNo}`;
  }

  @Column( {nullable: true})
  @Field()
  documentNo?: string;

  @Column()
  @Field()
  isDraft: boolean;

  @Column()
  @Field()
  isCalculated: boolean;

  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  grandTotal: number;

  @Field(type => [SalesInvoiceLine], { nullable: true })
  @OneToMany(type => SalesInvoiceLine, salesInvoiceLine => salesInvoiceLine.invoice)
  lines: Promise<Array<SalesInvoiceLine>>;

  @Column()
  @Field()
  narration: string;

  @Column( {type: 'float8'})
  @Field()
  totalLines: number;

  @Column( {type: 'float8'})
  @Field()
  totalLinesAccountingSchemeCurrency: number;

  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  grandTotalAccountingSchemeCurrency: number;

  @Column( {type: 'float8'})
  @Field()
  currencyMultiplyingRateToAccountingSchemeCurrency: number;

  @Column({type:'date'})
  @Field()
  transactionDate: Date;

  @Field(type => [SalesInvoiceVat], { nullable: true })
  @OneToMany(type => SalesInvoiceVat, salesInvoiceVat => salesInvoiceVat.invoice)
  vatReport: Promise<Array<SalesInvoiceVatModel>>;

  @Column({nullable: true})
  @Field({nullable: true})
  printDate: Date;

  @Column({default: false,})
  @Field()
  printed: boolean;

  @Column({nullable: true})
  @Field({nullable: true})
  printError?: string;

  @Field(type => String, { nullable: true })
  @Column('bytea', { nullable: true })
  content?: string;
}
