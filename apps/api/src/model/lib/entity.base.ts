/**
 * Please keep all the entities in this file to avoid circular dependencies see https://github.com/typeorm/typeorm/issues/4526
 */

import { Field, ObjectType } from '@nestjs/graphql';
import { UpdateDateColumn } from 'typeorm';
import { AccountingSchemeModel } from './accounting.scheme.model';
import { CurrencyModel } from './currency.model';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm/index';
import { AddressModel } from './address.model';
import { CountryModel } from './country.model';
import { OrganizationModel } from './organization.model';
import { CustomerModel } from './customer.model';
import { BankAccountModel } from './bank.account.model';
import { BankModel } from './bank.model';
import { CurrencyRateModel } from './currency.rate.model';
import { SalesInvoiceModel } from './sales.invoice.model';
import { ProductModel } from './product.model';
import { TaxModel } from './tax.model';
import { SalesInvoiceVatModel } from './sales.invoice.vat.model';
import { LanguageModel, languages } from './language.model';
import { SalesInvoiceLineModel } from './sales.invoice.line.model';
import { UserIdentityModel } from './user.identity.model';
import { UserModel } from './user.model';
import { UserToOrganizationModel } from './user.to.organization.model';

const euMembersISOCodes = [
  'BE',
  'EL',
  'LT',
  'PT',
  'BG',
  'ES',
  'LU',
  'RO',
  'CZ',
  'FR',
  'HU',
  'SI',
  'DK',
  'HR',
  'MT',
  'SK',
  'DE',
  'IT',
  'NL',
  'FI',
  'EE',
  'CY',
  'AT',
  'SE',
  'IE',
  'LV',
  'PL',
  'UK',
];

@ObjectType()
export abstract class EntityBase {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @UpdateDateColumn({
    nullable: false,
  })
  updtTs: Date;

  @Field()
  @Column({
    default: 0,
    nullable: false,
  })
  updtOpId: number;

  @Field()
  @Column({
    default: true,
  })
  isActive: boolean; // no matter the value, the entity can be visible to client and it's down to the specific use case

  @Field()
  @Column({
    default: true,
  })
  isCurrent: boolean; // if set to false, entity shall not be visible to a client, i.e. it is "deleted"
}

@Entity()
@ObjectType()
export class SalesInvoice extends EntityBase implements SalesInvoiceModel {
  @Field(() => BankAccount)
  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.salesInvoices, {
    nullable: false,
  })
  bankAccount: BankAccountModel;

  @Column({ type: 'date' })
  @Field()
  dueDate: Date;

  @Column({ type: 'date' })
  @Field()
  issuedOn: Date;

  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.salesInvoices, {
    nullable: false,
  })
  organization: OrganizationModel;

  @Field(() => Currency)
  @ManyToOne(() => Currency, (currency) => currency.salesInvoices, {
    nullable: false,
  })
  currency: CurrencyModel;

  @Field(() => Customer)
  @ManyToOne(() => Customer, (customer) => customer.salesInvoices, {
    nullable: false,
  })
  customer: CustomerModel;

  get displayName(): string {
    return this.isDraft ? `#${this.id}` : `${this.documentNo}`;
  }

  @Column({ nullable: true })
  @Field({ nullable: true })
  documentNo?: string;

  @Column()
  @Field()
  isDraft: boolean;

  @Column()
  @Field()
  isCalculated: boolean;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  grandTotal: number;

  @Field(() => [SalesInvoiceLine], { nullable: true })
  @OneToMany(
    () => SalesInvoiceLine,
    (salesInvoiceLine) => salesInvoiceLine.invoice
  )
  lines: Array<SalesInvoiceLineModel>;

  @Column({ type: 'float8' })
  @Field()
  totalLines: number;

  @Column({ type: 'float8' })
  @Field()
  totalLinesAccountingSchemeCurrency: number;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  grandTotalAccountingSchemeCurrency: number;

  @Column({ type: 'float8' })
  @Field()
  currencyMultiplyingRateToAccountingSchemeCurrency: number;

  @Column({ type: 'date' })
  @Field()
  transactionDate: Date;

  @Field(() => [SalesInvoiceVat], { nullable: true })
  @OneToMany(
    () => SalesInvoiceVat,
    (salesInvoiceVat) => salesInvoiceVat.invoice
  )
  vatReport: Array<SalesInvoiceVatModel>;

  @Column({ nullable: true })
  @Field({ nullable: true })
  printDate: Date;

  @Column({ default: false })
  @Field()
  printed: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  printError?: string;

  @Field(() => String, { nullable: true })
  @Column('bytea', { nullable: true })
  content?: string;

  @Column()
  @Field()
  paymentTermInDays: number;

  get printLanguage(): LanguageModel {
    return languages.find((x) => x.isoCode === this.printLanguageIsoCode);
  }

  set printLanguage(value: LanguageModel) {
    this.printLanguageIsoCode = value.isoCode;
  }

  @Column()
  printLanguageIsoCode: string;

  @Column()
  @Field()
  reverseCharge: boolean;
}

@Entity()
@ObjectType()
export class SalesInvoiceVat extends EntityBase
  implements SalesInvoiceVatModel {
  @Field(() => SalesInvoice)
  @ManyToOne(() => SalesInvoice, (salesInvoice) => salesInvoice.vatReport, {
    nullable: false,
  })
  invoice: SalesInvoiceModel;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  vatRatePercent: number;

  @Column({ type: 'float8' })
  @Field()
  vatTotalAccountingSchemeCurrencyRaw: number;

  @Column({ type: 'float8' })
  @Field()
  vatTotalRaw: number;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  vatTotalAccountingSchemeCurrency: number;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  vatTotal: number;

  displayName = '';
}

@ObjectType()
export abstract class UniqueDisplayEntityBase extends EntityBase {
  @Column()
  @Field()
  @Index({ unique: true })
  displayName: string;
}

@Entity()
@ObjectType()
export class Currency extends UniqueDisplayEntityBase implements CurrencyModel {
  @Column()
  @Field()
  isoCode: string;

  @OneToMany(() => SalesInvoice, (salesInvoice) => salesInvoice.currency)
  salesInvoices: Array<SalesInvoiceModel>;

  @Field(() => [CurrencyRate], { nullable: true })
  @OneToMany(() => CurrencyRate, (currencyRate) => currencyRate.from)
  currencyRatesFrom: Array<CurrencyRateModel>;

  @Field(() => [CurrencyRate], { nullable: true })
  @OneToMany(() => CurrencyRate, (currencyRate) => currencyRate.to)
  currencyRatesTo: Array<CurrencyRateModel>;

  @OneToMany(
    () => AccountingScheme,
    (accountingScheme) => accountingScheme.currency
  )
  accountingSchemas: Array<AccountingSchemeModel>;
}

@Entity()
@ObjectType()
export class User extends EntityBase implements UserModel {
  @Index({ unique: true })
  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Index({ unique: true })
  @Field({ nullable: true })
  @Column({ nullable: true })
  username?: string;

  @Index({ unique: true })
  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field((type) => [UserIdentity], { nullable: true })
  @OneToMany((type) => UserIdentity, (userIdentity) => userIdentity.user)
  identities: Array<UserIdentity>;

  @Field((type) => [UserToOrganization], { nullable: true })
  @OneToMany(
    (type) => UserToOrganization,
    (userToOrganization) => userToOrganization.user
  )
  organizations: Array<UserToOrganizationModel>;
}

@Entity()
@ObjectType()
export class UserToOrganization extends EntityBase
  implements UserToOrganizationModel {
  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.users, {
    nullable: false,
  })
  organization: OrganizationModel;

  @Field(() => User)
  @ManyToOne(() => User, (appUser) => appUser.organizations, {
    nullable: false,
  })
  user: UserModel;

  displayName: '';
}

@Entity()
@ObjectType()
export class Organization extends UniqueDisplayEntityBase
  implements OrganizationModel {
  @Column()
  @Field()
  contact: string;

  @Field(() => Address)
  @ManyToOne(
    () => Address,
    (address) => address.organizationRegisteredAddresses,
    {
      nullable: true,
    }
  )
  legalAddress: AddressModel;

  @Column()
  @Field()
  legalName: string;

  @Column()
  @Field()
  registration: string;

  @Column()
  @Field()
  idNumber: string;

  @Field(() => BankAccount)
  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.organizations, {
    nullable: true,
  })
  bankAccount: BankAccountModel;

  @Field(() => [SalesInvoice], { nullable: true })
  @OneToMany(() => SalesInvoice, (salesInvoice) => salesInvoice.organization)
  salesInvoices: Array<SalesInvoiceModel>;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @Index({ unique: true })
  vatNumber?: string;

  @Field(() => AccountingScheme)
  @ManyToOne(
    () => AccountingScheme,
    (accountingScheme) => accountingScheme.organizations,
    { nullable: false }
  )
  accountingScheme: AccountingSchemeModel;

  @Field(() => [DocumentNumberSequence], { nullable: true })
  @OneToMany(
    () => DocumentNumberSequence,
    (documentNumberSequence) => documentNumberSequence.organization
  )
  documentNumberSequences: Array<DocumentNumberSequence>;

  @Field((type) => [UserToOrganization], { nullable: true })
  @OneToMany(
    (type) => UserToOrganization,
    (userToOrganization) => userToOrganization.organization
  )
  users: Promise<Array<UserToOrganization>>;
}

@Entity()
@ObjectType()
export class AccountingScheme extends UniqueDisplayEntityBase
  implements AccountingSchemeModel {
  @Field(() => Currency)
  @ManyToOne(() => Currency, (currency) => currency.accountingSchemas, {
    nullable: false,
    eager: true,
  })
  currency: CurrencyModel;

  // do not propagate array of Organization to the client
  @OneToMany(
    () => Organization,
    (organization) => organization.accountingScheme
  )
  organizations: Promise<Array<Organization>>;
}

@Entity()
@ObjectType()
export class Country extends UniqueDisplayEntityBase implements CountryModel {
  get isEUMember(): boolean {
    return euMembersISOCodes.indexOf(this.isoCode) >= 0;
  }

  @Column({ unique: true })
  @Field()
  isoCode: string;

  @Field(() => [Address], { nullable: true })
  @OneToMany(() => Address, (address) => address.country)
  addresses: Promise<Array<AddressModel>>;
}

@Entity()
@ObjectType()
export class Customer extends UniqueDisplayEntityBase implements CustomerModel {
  @Field(() => Address)
  @ManyToOne(() => Address, (address) => address.customerRegistratedAddresses, {
    nullable: false,
  })
  legalAddress: AddressModel;

  @Column()
  @Field()
  @Index({ unique: true })
  legalName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @Index({ unique: true })
  vatNumber?: string;

  @Field(() => [SalesInvoice], { nullable: true })
  @OneToMany(() => SalesInvoice, (salesInvoice) => salesInvoice.customer)
  salesInvoices: Promise<Array<SalesInvoice>>;

  @Column()
  @Field()
  invoicingEmail: string;

  @Column()
  @Field()
  idNumber: string;
}

@Entity()
@ObjectType()
export class Address extends EntityBase implements AddressModel {
  @Field(() => Country)
  @ManyToOne(() => Country, (country) => country.addresses, {
    nullable: false,
  })
  country: CountryModel;

  get displayName(): string {
    return `${this.line1}, ${this.zipCode} ${this.city}`;
  }

  @Column()
  @Field()
  line1: string;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  zipCode: string;

  @Field(() => [Organization], { nullable: true })
  @OneToMany(() => Organization, (organization) => organization.legalAddress)
  organizationRegisteredAddresses: Array<OrganizationModel>;

  @Field(() => [Customer], { nullable: true })
  @OneToMany(() => Customer, (customer) => customer.legalAddress)
  customerRegistratedAddresses: Array<CustomerModel>;
}

@Entity()
@ObjectType()
export class Bank extends UniqueDisplayEntityBase implements BankModel {
  @Column()
  @Field()
  bankIdentifierCode: string;

  @Field(() => [BankAccount], { nullable: true })
  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.bank)
  bankAccounts: Array<BankAccountModel>;
}

@Entity()
@ObjectType()
export class BankAccount extends UniqueDisplayEntityBase
  implements BankAccountModel {
  @Column()
  @Field()
  iban: string;

  @Column()
  @Field()
  swift: string;
  @Field(() => Bank)
  @ManyToOne(() => Bank, (bank) => bank.bankAccounts, { nullable: false })
  bank: BankModel;

  @Column()
  @Field()
  bankAccountCustomerPrintableNumber: string;

  @Field(() => [SalesInvoice], { nullable: true })
  @OneToMany(() => SalesInvoice, (salesInvoice) => salesInvoice.bankAccount)
  salesInvoices: Array<SalesInvoiceModel>;

  @Field(() => [Organization], { nullable: true })
  @OneToMany(() => Organization, (organization) => organization.bankAccount)
  organizations: Array<Organization>;
}

@Entity()
@ObjectType()
export class CurrencyRate extends EntityBase implements CurrencyRateModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float8' })
  @Field()
  currencyMultiplyingRate: number;
  @Column({ type: 'date' })
  @Field()
  end: Date;
  @Field(() => Currency)
  @ManyToOne(() => Currency, (currency) => currency.currencyRatesFrom, {
    nullable: false,
  })
  from: CurrencyModel;
  @Column({ type: 'date' })
  @Field()
  start: Date;
  @Field(() => Currency)
  @ManyToOne(() => Currency, (currency) => currency.currencyRatesTo, {
    nullable: false,
  })
  to: CurrencyModel;
}

@Entity()
@ObjectType()
export class DocumentNumberSequence extends EntityBase {
  @Column()
  @Field()
  forType: string;

  @Column()
  @Field()
  current: number;

  @Field(() => Organization)
  @ManyToOne(
    () => Organization,
    (organization) => organization.documentNumberSequences,
    { nullable: false }
  )
  organization: OrganizationModel;
}

@Entity()
@ObjectType()
export class Tax extends EntityBase implements TaxModel {
  @Column()
  @Field()
  displayName: string;

  @Column()
  @Field()
  ratePercent: number;

  @Column()
  @Field()
  isStandard: boolean;

  @OneToMany(
    () => SalesInvoiceLine,
    (salesInvoiceLine) => salesInvoiceLine.lineTax
  )
  salesInvoiceLine: Promise<Array<SalesInvoiceLine>>;
}

@Entity()
@ObjectType()
export class SalesInvoiceLine extends EntityBase {
  /* Sales line start
   */
  @Column()
  @Field()
  lineOrder: number;

  @Field(() => Tax)
  @ManyToOne(() => Tax, (tax) => tax.salesInvoiceLine, { nullable: false })
  lineTax: TaxModel;

  @Column({ type: 'float8' })
  @Field()
  linePrice: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.salesInvoiceLine, {
    nullable: false,
  })
  product: ProductModel;

  @Column({ type: 'float8' })
  @Field()
  quantity: number;

  @Field(() => SalesInvoice)
  @ManyToOne(() => SalesInvoice, (salesInvoice) => salesInvoice.lines, {
    nullable: false,
  })
  invoice: SalesInvoiceModel;

  @Column()
  @Field()
  narration: string;
}

@Entity()
@ObjectType()
export class Product extends UniqueDisplayEntityBase implements ProductModel {
  @Field(() => [SalesInvoiceLine], { nullable: true })
  @OneToMany(
    () => SalesInvoiceLine,
    (salesInvoiceLine) => salesInvoiceLine.product
  )
  salesInvoiceLine: Array<SalesInvoiceLineModel>;

  @Column()
  @Field()
  @Index({ unique: true })
  sku: string;
}

@Entity()
@ObjectType()
export class UserIdentity extends EntityBase implements UserIdentityModel {
  @Index({ unique: true })
  @Column()
  @Field()
  externalUser: string;

  @Index()
  @Column()
  @Field()
  provider: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.identities, { nullable: false })
  user: UserModel;
}
