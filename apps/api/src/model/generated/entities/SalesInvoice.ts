import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BankAccount } from './BankAccount';
import { Currency } from './Currency';
import { Customer } from './Customer';
import { Organization } from './Organization';
import { SalesInvoiceLine } from './SalesInvoiceLine';
import { SalesInvoiceVat } from './SalesInvoiceVat';
import { SalesInvoiceModel } from '../../lib/sales.invoice.model';
import { SalesInvoiceLineModel } from '../../lib/sales.invoice.line.model';
import { SalesInvoiceVatModel } from '../../lib/sales.invoice.vat.model';
import { LanguageModel, languages } from '../../lib/language.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { BankAccountModel } from '../../lib/bank.account.model';
import { CurrencyModel } from '../../lib/currency.model';
import { CustomerModel } from '../../lib/customer.model';
import { OrganizationModel } from '../../lib/organization.model';
import { User } from './User';
import { UserModel } from '../../lib/user.model';
import { DateTimeScalarType } from '../../../app/support/date.scalar';
import { FactoringProvider } from './FactoringProvider';
import { FactoringProviderModel } from '../../lib/factoring.provider.model';

@Entity('sales_invoice', { schema: 'public' })
@ObjectType()
export class SalesInvoice implements SalesInvoiceModel {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  @Field(() => DateTimeScalarType)
  updtTs: Date;

  @ManyToOne(
    () => User,
    user => user.updSalesInvoices,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'updtOpId', referencedColumnName: 'id' }])
  @Field(() => User)
  updtOp: UserModel;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  @Field()
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  @Field()
  isCurrent: boolean;

  @Column('date', { name: 'dueDate' })
  @Field()
  dueDate: Date;

  @Column('date', { name: 'issuedOn' })
  @Field()
  issuedOn: Date;

  @Column('character varying', { name: 'documentNo', nullable: true })
  @Field({ nullable: true })
  documentNo: string | null;

  @Column('boolean', { name: 'isDraft' })
  @Field()
  isDraft: boolean;

  @Column('boolean', { name: 'isCalculated' })
  @Field()
  isCalculated: boolean;

  @Column('numeric', { name: 'grandTotal', precision: 12, scale: 2 })
  @Field()
  grandTotal: number;

  @Column('double precision', { name: 'totalLines' })
  @Field()
  totalLines: number;

  @Column('double precision', {
    name: 'totalLinesAccountingSchemeCurrency',
  })
  @Field()
  totalLinesAccountingSchemeCurrency: number;

  @Column('numeric', {
    name: 'grandTotalAccountingSchemeCurrency',
    precision: 12,
    scale: 2,
  })
  @Field()
  grandTotalAccountingSchemeCurrency: number;

  @Column('double precision', {
    name: 'currencyMultiplyingRateToAccountingSchemeCurrency',
  })
  @Field()
  currencyMultiplyingRateToAccountingSchemeCurrency: number;

  @Column('date', { name: 'transactionDate' })
  @Field()
  transactionDate: Date;

  @Column('timestamp without time zone', { name: 'printDate', nullable: true })
  @Field({ nullable: true })
  printDate: Date | null;

  @Column('boolean', { name: 'printed', default: () => 'false' })
  @Field()
  printed: boolean;

  @Column('character varying', { name: 'printError', nullable: true })
  @Field({ nullable: true })
  printError: string | null;

  @Column('bytea', { name: 'content', nullable: true })
  content: string;

  @Column('integer', { name: 'paymentTermInDays' })
  @Field()
  paymentTermInDays: number;

  @Column('character varying', { name: 'printLanguageIsoCode' })
  @Field()
  printLanguageIsoCode: string;

  @Column('boolean', { name: 'reverseCharge' })
  @Field()
  reverseCharge: boolean;

  @ManyToOne(
    () => BankAccount,
    bankAccount => bankAccount.salesInvoices,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'bankAccountId', referencedColumnName: 'id' }])
  @Field(() => BankAccount)
  bankAccount: BankAccountModel;

  @ManyToOne(
    () => Currency,
    currency => currency.salesInvoices,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'currencyId', referencedColumnName: 'id' }])
  @Field(() => Currency)
  currency: CurrencyModel;

  @ManyToOne(
    () => Customer,
    customer => customer.salesInvoices,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'customerId', referencedColumnName: 'id' }])
  @Field(() => Customer)
  customer: CustomerModel;

  @ManyToOne(
    () => Organization,
    organization => organization.salesInvoices,
    { nullable: false, eager: true },
  )
  @JoinColumn([{ name: 'organizationId', referencedColumnName: 'id' }])
  @Field(() => Organization)
  organization: OrganizationModel;

  @OneToMany(
    () => SalesInvoiceLine,
    salesInvoiceLine => salesInvoiceLine.invoice,
  )
  @Field(() => [SalesInvoiceLine])
  lines: SalesInvoiceLineModel[];

  @OneToMany(
    () => SalesInvoiceVat,
    salesInvoiceVat => salesInvoiceVat.invoice,
  )
  @Field(() => [SalesInvoiceVat])
  vatReport: SalesInvoiceVatModel[];

  get printLanguage(): LanguageModel {
    return languages.find(x => x.isoCode === this.printLanguageIsoCode);
  }

  set printLanguage(value: LanguageModel) {
    this.printLanguageIsoCode = value.isoCode;
  }

  @ManyToOne(
    () => FactoringProvider,
    factoringProvider => factoringProvider.salesInvoices,
    { nullable: true },
  )
  @JoinColumn([{ name: 'factoringProviderId', referencedColumnName: 'id' }])
  @Field(() => FactoringProvider)
  factoringProvider: FactoringProviderModel;
}
