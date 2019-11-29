import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** Date custom scalar type */
  Date: any,
  DateTime: any,
}



export interface Account {
   __typename?: 'Account',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  productsBought?: Maybe<Array<Product>>,
  productsSold?: Maybe<Array<Product>>,
  accountingScheme: AccountingScheme,
  code: Scalars['String'],
}

export interface AccountingScheme {
   __typename?: 'AccountingScheme',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  currency: Currency,
  accounts?: Maybe<Array<Account>>,
}

export interface AccountSaveArgs {
  id?: Maybe<Scalars['Float']>,
  accountingSchemeId: Scalars['Float'],
  code: Scalars['String'],
  displayName: Scalars['String'],
}

export interface Address {
   __typename?: 'Address',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  country: Country,
  line1: Scalars['String'],
  city: Scalars['String'],
  zipCode: Scalars['String'],
  customerRegistratedAddresses?: Maybe<Array<Customer>>,
  organizationRegistratedAddresses?: Maybe<Array<Organization>>,
  vendorRegistratedAddresses?: Maybe<Array<Vendor>>,
}

export interface AddressSaveArgs {
  city: Scalars['String'],
  countryIsoCode: Scalars['String'],
  line1: Scalars['String'],
  zipCode: Scalars['String'],
}

export interface AppUser {
   __typename?: 'AppUser',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  email?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  identities?: Maybe<Array<UserIdentity>>,
  organizations?: Maybe<Array<UserToOrganization>>,
  owningTasks?: Maybe<Array<Task>>,
  solvingTasks?: Maybe<Array<Task>>,
  ownCalendar?: Maybe<Array<CalendarActivity>>,
}

export interface Bank {
   __typename?: 'Bank',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  bankIdentifierCode: Scalars['String'],
  bankAccounts?: Maybe<Array<BankAccount>>,
}

export interface BankAccount {
   __typename?: 'BankAccount',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  iban: Scalars['String'],
  swift: Scalars['String'],
  bank: Bank,
  bankAccountCustomerPrintableNumber: Scalars['String'],
  salesInvoices?: Maybe<Array<SalesInvoice>>,
  recurringSalesInvoices?: Maybe<Array<RecurringSalesInvoice>>,
  organizations?: Maybe<Array<Organization>>,
  vendorInvoices?: Maybe<Array<VendorInvoice>>,
}

export interface BankAccountSaveArgs {
  id?: Maybe<Scalars['Float']>,
  bankId: Scalars['Float'],
  bankAccountCustomerPrintableNumber: Scalars['String'],
  displayName: Scalars['String'],
  iban: Scalars['String'],
  swift: Scalars['String'],
}

export interface BaseSaveArgs {
  id?: Maybe<Scalars['Float']>,
}

export interface CalendarActivity {
   __typename?: 'CalendarActivity',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  customer?: Maybe<Customer>,
  prospect?: Maybe<Prospect>,
  displayName: Scalars['String'],
  end: Scalars['DateTime'],
  location?: Maybe<Scalars['String']>,
  start: Scalars['DateTime'],
  owner: AppUser,
}

export interface Country {
   __typename?: 'Country',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  isoCode: Scalars['String'],
  addresses?: Maybe<Array<Address>>,
  vatRegistrations?: Maybe<Array<VatRegistration>>,
}

export interface Currency {
   __typename?: 'Currency',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  isoCode: Scalars['String'],
  currencyRatesFrom?: Maybe<Array<CurrencyRate>>,
  currencyRatesTo?: Maybe<Array<CurrencyRate>>,
}

export interface CurrencyRate {
   __typename?: 'CurrencyRate',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  currencyMultiplyingRate: Scalars['Float'],
  end: Scalars['Date'],
  from: Currency,
  start: Scalars['Date'],
  to: Currency,
}

export interface CurrencySaveArgs {
  id?: Maybe<Scalars['Float']>,
  isoCode: Scalars['String'],
  displayName: Scalars['String'],
}

export interface Customer {
   __typename?: 'Customer',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  legalAddress: Address,
  legalName: Scalars['String'],
  vatNumber?: Maybe<Scalars['String']>,
  salesInvoices?: Maybe<Array<SalesInvoice>>,
  calendarActivities?: Maybe<Array<CalendarActivity>>,
  tasks?: Maybe<Array<Task>>,
  invoicingEmail: Scalars['String'],
  idNumber: Scalars['String'],
}

export interface CustomerSaveArgs {
  id?: Maybe<Scalars['Float']>,
  legalAddress: AddressSaveArgs,
  displayName: Scalars['String'],
  vatNumber?: Maybe<Scalars['String']>,
  legalName: Scalars['String'],
  invoicingEmail: Scalars['String'],
  idNumber: Scalars['String'],
}



export interface DocumentNumberSequence {
   __typename?: 'DocumentNumberSequence',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  forType: Scalars['String'],
  current: Scalars['Float'],
  organization: Organization,
}

export interface EntityBase {
   __typename?: 'EntityBase',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
}

export interface GenericEntityArgs {
  id: Scalars['Int'],
  entityName: Scalars['String'],
  isCurrent: Scalars['Boolean'],
}

export interface GenericEntityResult {
   __typename?: 'GenericEntityResult',
  updated: Scalars['Boolean'],
  date: Scalars['Date'],
}

export interface Lead {
   __typename?: 'Lead',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  company?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  phone?: Maybe<Scalars['String']>,
  budget: Scalars['Float'],
  currency: Currency,
  expectedSolution: Scalars['String'],
  problemToSolve: Scalars['String'],
}

export interface LoginArgs {
  username: Scalars['String'],
  password: Scalars['String'],
}

export interface Mutation {
   __typename?: 'Mutation',
  setIsCurrent: GenericEntityResult,
  customer: Customer,
  salesInvoice: SalesInvoice,
  confirmSalesInvoice: SalesInvoice,
  task: Task,
  prospect: Prospect,
  account: Account,
  product: Product,
  salesInvoiceLine: SalesInvoiceLine,
  tax: Tax,
  bankAccount: BankAccount,
  currency: Currency,
}


export interface MutationSetIsCurrentArgs {
  args: GenericEntityArgs
}


export interface MutationCustomerArgs {
  args: CustomerSaveArgs
}


export interface MutationSalesInvoiceArgs {
  args: SalesInvoiceSaveArgs
}


export interface MutationConfirmSalesInvoiceArgs {
  args: BaseSaveArgs
}


export interface MutationTaskArgs {
  args: TaskSaveArgs
}


export interface MutationProspectArgs {
  args: ProspectSaveArgs
}


export interface MutationAccountArgs {
  args: AccountSaveArgs
}


export interface MutationProductArgs {
  args: ProductSaveArgs
}


export interface MutationSalesInvoiceLineArgs {
  args: SalesInvoiceLineSaveArgs
}


export interface MutationTaxArgs {
  args: TaxSaveArgs
}


export interface MutationBankAccountArgs {
  args: BankAccountSaveArgs
}


export interface MutationCurrencyArgs {
  args: CurrencySaveArgs
}

export interface Opportunity {
   __typename?: 'Opportunity',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  budget: Scalars['Float'],
  closingDate: Scalars['Date'],
  company: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  currency: Currency,
  solution: Product,
}

export interface Organization {
   __typename?: 'Organization',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  contact: Scalars['String'],
  legalAddress: Address,
  legalName: Scalars['String'],
  vatRegistrations?: Maybe<Array<VatRegistration>>,
  salesInvoices?: Maybe<Array<SalesInvoice>>,
  recurringSalesInvoices?: Maybe<Array<SalesInvoice>>,
  vendorInvoices?: Maybe<Array<VendorInvoice>>,
  bankAccount: BankAccount,
  accountingScheme: AccountingScheme,
  users?: Maybe<Array<UserToOrganization>>,
  documentNumberSequences?: Maybe<Array<DocumentNumberSequence>>,
  projects?: Maybe<Array<Project>>,
  registration: Scalars['String'],
  idNumber: Scalars['String'],
}

export interface Product {
   __typename?: 'Product',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  buyingAccount: Account,
  sellingAccount: Account,
  salesInvoiceLine?: Maybe<Array<SalesInvoiceLine>>,
  recurringSalesInvoiceLine?: Maybe<Array<RecurringSalesInvoiceLine>>,
  sku: Scalars['String'],
  opportunities?: Maybe<Array<Opportunity>>,
}

export interface ProductSaveArgs {
  id?: Maybe<Scalars['Float']>,
  buyingAccountCode: Scalars['String'],
  displayName: Scalars['String'],
  sellingAccountCode: Scalars['String'],
  sku: Scalars['String'],
}

export interface Project {
   __typename?: 'Project',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  owner: Organization,
  tasks?: Maybe<Array<Task>>,
}

export interface Prospect {
   __typename?: 'Prospect',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  actionTaken: Scalars['String'],
  problem: Scalars['String'],
  url?: Maybe<Scalars['String']>,
  originated: Suspect,
  tasks?: Maybe<Array<Task>>,
  calendarActivities?: Maybe<Array<CalendarActivity>>,
}

export interface ProspectSaveArgs {
  id?: Maybe<Scalars['Float']>,
  actionTaken: Scalars['String'],
  displayName: Scalars['String'],
  problem: Scalars['String'],
  url: Scalars['String'],
  originatedSuspectId?: Maybe<Scalars['Float']>,
}

export interface Query {
   __typename?: 'Query',
  getIsCurrent: Array<GenericEntityResult>,
  now: Scalars['DateTime'],
  customers: Array<Customer>,
  customerById: Customer,
  invoices: Array<SalesInvoice>,
  salesInvoiceById: SalesInvoice,
  tasks: Array<Task>,
  calendarActivities: Array<CalendarActivity>,
  users: Array<AppUser>,
  leads: Array<Lead>,
  prospects: Array<Prospect>,
  prospectById: Prospect,
  accounts: Array<Account>,
  accountById: Account,
  products: Array<Product>,
  productById: Product,
  salesInvoiceLines: Array<SalesInvoiceLine>,
  salesInvoiceLineById: SalesInvoiceLine,
  myOrganizations: Array<Organization>,
  organizationById: Organization,
  taxes: Array<Tax>,
  taxById: Tax,
  bankAccounts: Array<BankAccount>,
  bankAccountById: BankAccount,
  currencies: Array<Currency>,
  currencyById: Currency,
}


export interface QueryGetIsCurrentArgs {
  args: GenericEntityArgs
}


export interface QueryCustomerByIdArgs {
  id: Scalars['Int']
}


export interface QuerySalesInvoiceByIdArgs {
  id: Scalars['Int']
}


export interface QueryProspectByIdArgs {
  id: Scalars['Int']
}


export interface QueryAccountByIdArgs {
  id: Scalars['Int']
}


export interface QueryProductByIdArgs {
  id: Scalars['Int']
}


export interface QuerySalesInvoiceLineByIdArgs {
  id: Scalars['Int']
}


export interface QueryOrganizationByIdArgs {
  id: Scalars['Int']
}


export interface QueryTaxByIdArgs {
  id: Scalars['Int']
}


export interface QueryBankAccountByIdArgs {
  id: Scalars['Int']
}


export interface QueryCurrencyByIdArgs {
  id: Scalars['Int']
}

export interface RecurringSalesInvoice {
   __typename?: 'RecurringSalesInvoice',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  bankAccount: BankAccount,
  currency: Currency,
  customer: Customer,
  lines?: Maybe<Array<RecurringSalesInvoiceLine>>,
  organization: Organization,
  cronPattern?: Maybe<Scalars['String']>,
  lastDayInMonth?: Maybe<Scalars['Boolean']>,
  paymentTermInDays: Scalars['Float'],
}

export interface RecurringSalesInvoiceLine {
   __typename?: 'RecurringSalesInvoiceLine',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  linePrice: Scalars['Float'],
  lineTax: Tax,
  narration: Scalars['String'],
  product: Product,
  quantity: Scalars['Float'],
  invoice: RecurringSalesInvoice,
}

export interface SalesInvoice {
   __typename?: 'SalesInvoice',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  bankAccount: BankAccount,
  dueDate: Scalars['Date'],
  issuedOn: Scalars['Date'],
  organization: Organization,
  currency: Currency,
  customer: Customer,
  documentNo?: Maybe<Scalars['String']>,
  isDraft: Scalars['Boolean'],
  isCalculated: Scalars['Boolean'],
  grandTotal: Scalars['Float'],
  lines?: Maybe<Array<SalesInvoiceLine>>,
  narration: Scalars['String'],
  totalLines: Scalars['Float'],
  totalLinesAccountingSchemeCurrency: Scalars['Float'],
  grandTotalAccountingSchemeCurrency: Scalars['Float'],
  currencyMultiplyingRateToAccountingSchemeCurrency: Scalars['Float'],
  transactionDate: Scalars['Date'],
  vatReport?: Maybe<Array<SalesInvoiceVat>>,
  printDate?: Maybe<Scalars['Date']>,
  printed: Scalars['Boolean'],
  printError?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  paymentTermInDays: Scalars['Float'],
}

export interface SalesInvoiceLine {
   __typename?: 'SalesInvoiceLine',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  lineOrder: Scalars['Float'],
  lineTax: Tax,
  linePrice: Scalars['Float'],
  product: Product,
  quantity: Scalars['Float'],
  invoice: SalesInvoice,
  task: Task,
  narration: Scalars['String'],
}

export interface SalesInvoiceLineSaveArgs {
  id?: Maybe<Scalars['Float']>,
  invoiceId?: Maybe<Scalars['Float']>,
  lineOrder: Scalars['Float'],
  linePrice: Scalars['Float'],
  lineTaxId: Scalars['Float'],
  narration: Scalars['String'],
  productId: Scalars['Float'],
  quantity: Scalars['Float'],
}

export interface SalesInvoiceSaveArgs {
  id?: Maybe<Scalars['Float']>,
  bankAccountDisplayName: Scalars['String'],
  currencyIsoCode: Scalars['String'],
  customerDisplayName: Scalars['String'],
  issuedOn: Scalars['Date'],
  lines: Array<SalesInvoiceLineSaveArgs>,
  organizationDisplayName: Scalars['String'],
  paymentTermInDays: Scalars['Float'],
  transactionDate: Scalars['Date'],
}

export interface SalesInvoiceVat {
   __typename?: 'SalesInvoiceVat',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  invoice: SalesInvoice,
  vatRatePercent: Scalars['Float'],
  vatTotalAccountingSchemeCurrencyRaw: Scalars['Float'],
  vatTotalRaw: Scalars['Float'],
  vatTotalAccountingSchemeCurrency: Scalars['Float'],
  vatTotal: Scalars['Float'],
}

export interface Suspect {
   __typename?: 'Suspect',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  description: Scalars['String'],
  url?: Maybe<Scalars['String']>,
  prospects?: Maybe<Array<Prospect>>,
  tasks?: Maybe<Array<Task>>,
}

export interface Task {
   __typename?: 'Task',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  completed: Scalars['Boolean'],
  customer?: Maybe<Customer>,
  description?: Maybe<Scalars['String']>,
  displayName: Scalars['String'],
  dueDate: Scalars['Date'],
  invoiceLines?: Maybe<Array<SalesInvoiceLine>>,
  workLogs?: Maybe<Array<WorkLog>>,
  owner: AppUser,
  responsible: AppUser,
  predecessors: Task,
  project?: Maybe<Project>,
  prospect?: Maybe<Prospect>,
  suspect?: Maybe<Suspect>,
}

export interface TaskSaveArgs {
  id?: Maybe<Scalars['Float']>,
  customerId?: Maybe<Scalars['Float']>,
  dueDate: Scalars['Date'],
  ownerId: Scalars['Float'],
  responsibleId: Scalars['Float'],
  displayName: Scalars['String'],
  prospectId?: Maybe<Scalars['Float']>,
}

export interface Tax {
   __typename?: 'Tax',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  ratePercent: Scalars['Float'],
}

export interface TaxSaveArgs {
  id?: Maybe<Scalars['Float']>,
  displayName: Scalars['String'],
  ratePercent: Scalars['Float'],
}

export interface UniqueDisplayEntityBase {
   __typename?: 'UniqueDisplayEntityBase',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
}

export interface UserIdentity {
   __typename?: 'UserIdentity',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  externalUser: Scalars['String'],
  provider: Scalars['String'],
  user: AppUser,
}

export interface UserToOrganization {
   __typename?: 'UserToOrganization',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  organization: Organization,
  user: AppUser,
}

export interface VatRegistration {
   __typename?: 'VatRegistration',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  registeredIn: Country,
  registeredFor: Organization,
  start: Scalars['Date'],
  vatNumber: Scalars['String'],
  end?: Maybe<Scalars['Date']>,
}

export interface Vendor {
   __typename?: 'Vendor',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  invoicingEmail: Scalars['String'],
  legalAddress: Address,
  legalName: Scalars['String'],
  vatNumber?: Maybe<Scalars['String']>,
}

export interface VendorInvoice {
   __typename?: 'VendorInvoice',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  bankAccount: BankAccount,
  currency: Currency,
  documentNo: Scalars['String'],
  dueDate: Scalars['Date'],
  grandTotal: Scalars['Float'],
  grandTotalAccountingSchemeCurrency: Scalars['Float'],
  narration: Scalars['String'],
  organization: Organization,
  transactionDate: Scalars['Date'],
  vatReport?: Maybe<Array<VendorInvoiceVat>>,
  issuedOn: Scalars['Date'],
}

export interface VendorInvoiceVat {
   __typename?: 'VendorInvoiceVat',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  invoice: VendorInvoice,
  vatRatePercent: Scalars['Float'],
  vatTotalAccountingSchemeCurrency: Scalars['Float'],
}

export interface WorkLog {
   __typename?: 'WorkLog',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  displayName: Scalars['String'],
  durationInMinutes: Scalars['Float'],
  task: Task,
}

export type CustomerDetailPartsFragment = (
  { __typename?: 'Customer' }
  & Pick<Customer, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'legalName' | 'vatNumber' | 'invoicingEmail' | 'idNumber'>
  & { legalAddress: (
    { __typename?: 'Address' }
    & Pick<Address, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'line1' | 'city' | 'zipCode'>
    & { country: (
      { __typename?: 'Country' }
      & Pick<Country, 'id' | 'displayName' | 'isoCode'>
    ) }
  ), salesInvoices: Maybe<Array<(
    { __typename?: 'SalesInvoice' }
    & SalesInvoiceListPartsFragment
  )>>, calendarActivities: Maybe<Array<(
    { __typename?: 'CalendarActivity' }
    & CalendarActivityListPartsFragment
  )>>, tasks: Maybe<Array<(
    { __typename?: 'Task' }
    & TaskListPartsFragment
  )>> }
);

export interface CustomerByIdQueryVariables {
  id: Scalars['Int']
}


export type CustomerByIdQuery = (
  { __typename?: 'Query' }
  & { customerById: (
    { __typename?: 'Customer' }
    & CustomerDetailPartsFragment
  ) }
);

export interface ConfirmSalesInvoiceMutationVariables {
  args: BaseSaveArgs
}


export type ConfirmSalesInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { confirmSalesInvoice: (
    { __typename?: 'SalesInvoice' }
    & SalesInvoiceListPartsFragment
  ) }
);

export interface SalesInvoiceByIdQueryVariables {
  id: Scalars['Int']
}


export type SalesInvoiceByIdQuery = (
  { __typename?: 'Query' }
  & { salesInvoiceById: (
    { __typename?: 'SalesInvoice' }
    & SalesInvoiceDetailPartsFragment
  ) }
);

export type SalesInvoiceDetailPartsFragment = (
  { __typename?: 'SalesInvoice' }
  & Pick<SalesInvoice, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'grandTotalAccountingSchemeCurrency' | 'dueDate' | 'issuedOn' | 'paymentTermInDays' | 'isDraft' | 'isCalculated' | 'documentNo' | 'grandTotal' | 'narration' | 'totalLines' | 'totalLinesAccountingSchemeCurrency' | 'currencyMultiplyingRateToAccountingSchemeCurrency' | 'transactionDate' | 'printed'>
  & { customer: (
    { __typename?: 'Customer' }
    & CustomerListPartsFragment
  ), lines: Maybe<Array<(
    { __typename?: 'SalesInvoiceLine' }
    & SalesInvoiceLineDetailPartsFragment
  )>>, bankAccount: (
    { __typename?: 'BankAccount' }
    & BankAccountListPartsFragment
  ), organization: (
    { __typename?: 'Organization' }
    & OrganizationListPartsFragment
  ), currency: (
    { __typename?: 'Currency' }
    & CurrencyListPartsFragment
  ), vatReport: Maybe<Array<(
    { __typename?: 'SalesInvoiceVat' }
    & Pick<SalesInvoiceVat, 'vatRatePercent' | 'vatTotal' | 'vatTotalAccountingSchemeCurrency'>
  )>> }
);

export type ProspectDetailPartsFragment = (
  { __typename?: 'Prospect' }
  & Pick<Prospect, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'actionTaken' | 'problem' | 'url'>
  & { calendarActivities: Maybe<Array<(
    { __typename?: 'CalendarActivity' }
    & CalendarActivityListPartsFragment
  )>>, tasks: Maybe<Array<(
    { __typename?: 'Task' }
    & TaskListPartsFragment
  )>> }
);

export interface ProspectByIdQueryVariables {
  id: Scalars['Int']
}


export type ProspectByIdQuery = (
  { __typename?: 'Query' }
  & { prospectById: (
    { __typename?: 'Prospect' }
    & ProspectDetailPartsFragment
  ) }
);

export interface CustomerMutationVariables {
  args: CustomerSaveArgs
}


export type CustomerMutation = (
  { __typename?: 'Mutation' }
  & { customer: (
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'displayName' | 'legalName' | 'vatNumber'>
    & { legalAddress: (
      { __typename?: 'Address' }
      & Pick<Address, 'id' | 'line1' | 'city' | 'zipCode'>
      & { country: (
        { __typename?: 'Country' }
        & Pick<Country, 'id'>
      ) }
    ) }
  ) }
);

export interface SalesInvoiceLineMutationVariables {
  args: SalesInvoiceLineSaveArgs
}


export type SalesInvoiceLineMutation = (
  { __typename?: 'Mutation' }
  & { salesInvoiceLine: (
    { __typename?: 'SalesInvoiceLine' }
    & SalesInvoiceLineListPartsFragment
  ) }
);

export type SalesInvoiceLineDetailPartsFragment = (
  { __typename?: 'SalesInvoiceLine' }
  & Pick<SalesInvoiceLine, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'lineOrder' | 'linePrice' | 'quantity' | 'narration'>
  & { lineTax: (
    { __typename?: 'Tax' }
    & Pick<Tax, 'id' | 'displayName'>
  ), product: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'displayName'>
  ), invoice: (
    { __typename?: 'SalesInvoice' }
    & Pick<SalesInvoice, 'id'>
  ) }
);

export type SalesInvoiceLineListPartsFragment = (
  { __typename?: 'SalesInvoiceLine' }
  & Pick<SalesInvoiceLine, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'lineOrder' | 'linePrice' | 'quantity' | 'narration'>
  & { lineTax: (
    { __typename?: 'Tax' }
    & Pick<Tax, 'id' | 'displayName'>
  ), product: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'displayName'>
  ), invoice: (
    { __typename?: 'SalesInvoice' }
    & Pick<SalesInvoice, 'id'>
  ) }
);

export interface ProspectMutationVariables {
  args: ProspectSaveArgs
}


export type ProspectMutation = (
  { __typename?: 'Mutation' }
  & { prospect: (
    { __typename?: 'Prospect' }
    & ProspectListPartsFragment
  ) }
);

export interface SalesInvoiceMutationVariables {
  args: SalesInvoiceSaveArgs
}


export type SalesInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { salesInvoice: (
    { __typename?: 'SalesInvoice' }
    & SalesInvoiceListPartsFragment
  ) }
);

export interface TaskMutationVariables {
  args: TaskSaveArgs
}


export type TaskMutation = (
  { __typename?: 'Mutation' }
  & { task: (
    { __typename?: 'Task' }
    & TaskListPartsFragment
  ) }
);

export type AccountListPartsFragment = (
  { __typename?: 'Account' }
  & Pick<Account, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'code'>
);

export interface AccountsQueryVariables {}


export type AccountsQuery = (
  { __typename?: 'Query' }
  & { accounts: Array<(
    { __typename?: 'Account' }
    & AccountListPartsFragment
  )> }
);

export interface BankAccountsQueryVariables {}


export type BankAccountsQuery = (
  { __typename?: 'Query' }
  & { bankAccounts: Array<(
    { __typename?: 'BankAccount' }
    & BankAccountListPartsFragment
  )> }
);

export type CalendarActivityListPartsFragment = (
  { __typename?: 'CalendarActivity' }
  & Pick<CalendarActivity, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'start' | 'end'>
  & { owner: (
    { __typename?: 'AppUser' }
    & UserListPartsFragment
  ), customer: Maybe<(
    { __typename?: 'Customer' }
    & CustomerListPartsFragment
  )>, prospect: Maybe<(
    { __typename?: 'Prospect' }
    & ProspectListPartsFragment
  )> }
);

export interface CalendarActivitiesQueryVariables {}


export type CalendarActivitiesQuery = (
  { __typename?: 'Query' }
  & { calendarActivities: Array<(
    { __typename?: 'CalendarActivity' }
    & CalendarActivityListPartsFragment
  )> }
);

export interface CurrenciesQueryVariables {}


export type CurrenciesQuery = (
  { __typename?: 'Query' }
  & { currencies: Array<(
    { __typename?: 'Currency' }
    & CurrencyListPartsFragment
  )> }
);

export type CustomerListPartsFragment = (
  { __typename?: 'Customer' }
  & Pick<Customer, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'legalName' | 'vatNumber' | 'invoicingEmail' | 'idNumber'>
  & { legalAddress: (
    { __typename?: 'Address' }
    & Pick<Address, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'line1' | 'city' | 'zipCode'>
    & { country: (
      { __typename?: 'Country' }
      & Pick<Country, 'id' | 'displayName' | 'isoCode'>
    ) }
  ) }
);

export interface CustomersQueryVariables {}


export type CustomersQuery = (
  { __typename?: 'Query' }
  & { customers: Array<(
    { __typename?: 'Customer' }
    & CustomerListPartsFragment
  )> }
);

export type SalesInvoiceListPartsFragment = (
  { __typename?: 'SalesInvoice' }
  & Pick<SalesInvoice, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'grandTotalAccountingSchemeCurrency' | 'dueDate' | 'issuedOn' | 'isDraft' | 'isCalculated' | 'documentNo' | 'grandTotal' | 'narration' | 'totalLines' | 'totalLinesAccountingSchemeCurrency' | 'currencyMultiplyingRateToAccountingSchemeCurrency' | 'transactionDate' | 'printed'>
  & { organization: (
    { __typename?: 'Organization' }
    & Pick<Organization, 'id'>
    & { accountingScheme: (
      { __typename?: 'AccountingScheme' }
      & { currency: (
        { __typename?: 'Currency' }
        & CurrencyListPartsFragment
      ) }
    ) }
  ), currency: (
    { __typename?: 'Currency' }
    & Pick<Currency, 'id' | 'displayName' | 'isoCode'>
  ), customer: (
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'displayName' | 'legalName'>
  ) }
);

export interface SalesInvoicesQueryVariables {}


export type SalesInvoicesQuery = (
  { __typename?: 'Query' }
  & { invoices: Array<(
    { __typename?: 'SalesInvoice' }
    & SalesInvoiceListPartsFragment
  )> }
);

export type CurrencyListPartsFragment = (
  { __typename?: 'Currency' }
  & Pick<Currency, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'isoCode'>
);

export type LeadListPartsFragment = (
  { __typename?: 'Lead' }
  & Pick<Lead, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'company' | 'email' | 'phone' | 'budget'>
  & { currency: (
    { __typename?: 'Currency' }
    & CurrencyListPartsFragment
  ) }
);

export interface LeadsQueryVariables {}


export type LeadsQuery = (
  { __typename?: 'Query' }
  & { leads: Array<(
    { __typename?: 'Lead' }
    & LeadListPartsFragment
  )> }
);

export type AddressDetailPartsFragment = (
  { __typename?: 'Address' }
  & Pick<Address, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'line1'>
);

export type BankAccountListPartsFragment = (
  { __typename?: 'BankAccount' }
  & Pick<BankAccount, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'bankAccountCustomerPrintableNumber'>
);

export type OrganizationDetailPartsFragment = (
  { __typename?: 'Organization' }
  & Pick<Organization, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName'>
  & { bankAccount: (
    { __typename?: 'BankAccount' }
    & BankAccountListPartsFragment
  ), legalAddress: (
    { __typename?: 'Address' }
    & AddressDetailPartsFragment
  ) }
);

export type OrganizationListPartsFragment = (
  { __typename?: 'Organization' }
  & Pick<Organization, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName'>
  & { bankAccount: (
    { __typename?: 'BankAccount' }
    & BankAccountListPartsFragment
  ), accountingScheme: (
    { __typename?: 'AccountingScheme' }
    & { currency: (
      { __typename?: 'Currency' }
      & CurrencyListPartsFragment
    ) }
  ) }
);

export interface MyOrganizationsQueryVariables {}


export type MyOrganizationsQuery = (
  { __typename?: 'Query' }
  & { myOrganizations: Array<(
    { __typename?: 'Organization' }
    & OrganizationListPartsFragment
  )> }
);

export type ProductListPartsFragment = (
  { __typename?: 'Product' }
  & Pick<Product, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'sku'>
);

export interface ProductsQueryVariables {}


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & ProductListPartsFragment
  )> }
);

export type ProspectListPartsFragment = (
  { __typename?: 'Prospect' }
  & Pick<Prospect, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'actionTaken' | 'problem' | 'url'>
);

export interface ProspectsQueryVariables {}


export type ProspectsQuery = (
  { __typename?: 'Query' }
  & { prospects: Array<(
    { __typename?: 'Prospect' }
    & ProspectListPartsFragment
  )> }
);

export type TaskListPartsFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'displayName' | 'dueDate'>
  & { owner: (
    { __typename?: 'AppUser' }
    & UserListPartsFragment
  ), responsible: (
    { __typename?: 'AppUser' }
    & UserListPartsFragment
  ), customer: Maybe<(
    { __typename?: 'Customer' }
    & CustomerListPartsFragment
  )>, prospect: Maybe<(
    { __typename?: 'Prospect' }
    & ProspectListPartsFragment
  )> }
);

export interface TasksQueryVariables {}


export type TasksQuery = (
  { __typename?: 'Query' }
  & { tasks: Array<(
    { __typename?: 'Task' }
    & TaskListPartsFragment
  )> }
);

export type TaxListPartsFragment = (
  { __typename?: 'Tax' }
  & Pick<Tax, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'ratePercent'>
);

export interface TaxesQueryVariables {}


export type TaxesQuery = (
  { __typename?: 'Query' }
  & { taxes: Array<(
    { __typename?: 'Tax' }
    & TaxListPartsFragment
  )> }
);

export type UserListPartsFragment = (
  { __typename?: 'AppUser' }
  & Pick<AppUser, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'email' | 'username' | 'name'>
);

export interface UsersQueryVariables {}


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'AppUser' }
    & UserListPartsFragment
  )> }
);

export interface GetServerTimeQueryVariables {}


export type GetServerTimeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'now'>
);

export const CurrencyListPartsFragmentDoc = gql`
    fragment CurrencyListParts on Currency {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  isoCode
}
    `;
export const SalesInvoiceListPartsFragmentDoc = gql`
    fragment SalesInvoiceListParts on SalesInvoice {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  grandTotalAccountingSchemeCurrency
  dueDate
  issuedOn
  organization {
    id
    accountingScheme {
      currency {
        ...CurrencyListParts
      }
    }
  }
  currency {
    id
    displayName
    isoCode
  }
  isDraft
  isCalculated
  documentNo
  customer {
    id
    displayName
    legalName
  }
  grandTotal
  narration
  totalLines
  totalLinesAccountingSchemeCurrency
  currencyMultiplyingRateToAccountingSchemeCurrency
  transactionDate
  printed
}
    ${CurrencyListPartsFragmentDoc}`;
export const UserListPartsFragmentDoc = gql`
    fragment UserListParts on AppUser {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  email
  username
  name
}
    `;
export const CustomerListPartsFragmentDoc = gql`
    fragment CustomerListParts on Customer {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  legalName
  vatNumber
  legalAddress {
    id
    updtTs
    updtOpId
    isActive
    isCurrent
    line1
    city
    country {
      id
      displayName
      isoCode
    }
    zipCode
  }
  invoicingEmail
  idNumber
}
    `;
export const ProspectListPartsFragmentDoc = gql`
    fragment ProspectListParts on Prospect {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  actionTaken
  problem
  url
}
    `;
export const CalendarActivityListPartsFragmentDoc = gql`
    fragment CalendarActivityListParts on CalendarActivity {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  start
  end
  owner {
    ...UserListParts
  }
  customer {
    ...CustomerListParts
  }
  prospect {
    ...ProspectListParts
  }
}
    ${UserListPartsFragmentDoc}
${CustomerListPartsFragmentDoc}
${ProspectListPartsFragmentDoc}`;
export const TaskListPartsFragmentDoc = gql`
    fragment TaskListParts on Task {
  id
  displayName
  dueDate
  owner {
    ...UserListParts
  }
  responsible {
    ...UserListParts
  }
  customer {
    ...CustomerListParts
  }
  prospect {
    ...ProspectListParts
  }
}
    ${UserListPartsFragmentDoc}
${CustomerListPartsFragmentDoc}
${ProspectListPartsFragmentDoc}`;
export const CustomerDetailPartsFragmentDoc = gql`
    fragment CustomerDetailParts on Customer {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  legalName
  vatNumber
  legalAddress {
    id
    updtTs
    updtOpId
    isActive
    isCurrent
    line1
    city
    country {
      id
      displayName
      isoCode
    }
    zipCode
  }
  invoicingEmail
  salesInvoices {
    ...SalesInvoiceListParts
  }
  calendarActivities {
    ...CalendarActivityListParts
  }
  tasks {
    ...TaskListParts
  }
  idNumber
}
    ${SalesInvoiceListPartsFragmentDoc}
${CalendarActivityListPartsFragmentDoc}
${TaskListPartsFragmentDoc}`;
export const SalesInvoiceLineDetailPartsFragmentDoc = gql`
    fragment SalesInvoiceLineDetailParts on SalesInvoiceLine {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  lineOrder
  lineTax {
    id
    displayName
  }
  linePrice
  product {
    id
    displayName
  }
  quantity
  invoice {
    id
  }
  narration
}
    `;
export const BankAccountListPartsFragmentDoc = gql`
    fragment BankAccountListParts on BankAccount {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  bankAccountCustomerPrintableNumber
}
    `;
export const OrganizationListPartsFragmentDoc = gql`
    fragment OrganizationListParts on Organization {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  bankAccount {
    ...BankAccountListParts
  }
  accountingScheme {
    currency {
      ...CurrencyListParts
    }
  }
}
    ${BankAccountListPartsFragmentDoc}
${CurrencyListPartsFragmentDoc}`;
export const SalesInvoiceDetailPartsFragmentDoc = gql`
    fragment SalesInvoiceDetailParts on SalesInvoice {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  grandTotalAccountingSchemeCurrency
  dueDate
  issuedOn
  paymentTermInDays
  isDraft
  isCalculated
  documentNo
  customer {
    ...CustomerListParts
  }
  grandTotal
  narration
  totalLines
  totalLinesAccountingSchemeCurrency
  currencyMultiplyingRateToAccountingSchemeCurrency
  transactionDate
  printed
  lines {
    ...SalesInvoiceLineDetailParts
  }
  bankAccount {
    ...BankAccountListParts
  }
  organization {
    ...OrganizationListParts
  }
  currency {
    ...CurrencyListParts
  }
  vatReport {
    vatRatePercent
    vatTotal
    vatTotalAccountingSchemeCurrency
  }
}
    ${CustomerListPartsFragmentDoc}
${SalesInvoiceLineDetailPartsFragmentDoc}
${BankAccountListPartsFragmentDoc}
${OrganizationListPartsFragmentDoc}
${CurrencyListPartsFragmentDoc}`;
export const ProspectDetailPartsFragmentDoc = gql`
    fragment ProspectDetailParts on Prospect {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  actionTaken
  problem
  url
  calendarActivities {
    ...CalendarActivityListParts
  }
  tasks {
    ...TaskListParts
  }
}
    ${CalendarActivityListPartsFragmentDoc}
${TaskListPartsFragmentDoc}`;
export const SalesInvoiceLineListPartsFragmentDoc = gql`
    fragment SalesInvoiceLineListParts on SalesInvoiceLine {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  lineOrder
  lineTax {
    id
    displayName
  }
  linePrice
  product {
    id
    displayName
  }
  quantity
  invoice {
    id
  }
  narration
}
    `;
export const AccountListPartsFragmentDoc = gql`
    fragment AccountListParts on Account {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  code
}
    `;
export const LeadListPartsFragmentDoc = gql`
    fragment LeadListParts on Lead {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  company
  email
  phone
  budget
  currency {
    ...CurrencyListParts
  }
}
    ${CurrencyListPartsFragmentDoc}`;
export const AddressDetailPartsFragmentDoc = gql`
    fragment AddressDetailParts on Address {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  line1
}
    `;
export const OrganizationDetailPartsFragmentDoc = gql`
    fragment OrganizationDetailParts on Organization {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  bankAccount {
    ...BankAccountListParts
  }
  legalAddress {
    ...AddressDetailParts
  }
}
    ${BankAccountListPartsFragmentDoc}
${AddressDetailPartsFragmentDoc}`;
export const ProductListPartsFragmentDoc = gql`
    fragment ProductListParts on Product {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  sku
}
    `;
export const TaxListPartsFragmentDoc = gql`
    fragment TaxListParts on Tax {
  id
  updtTs
  updtOpId
  isActive
  isCurrent
  displayName
  ratePercent
}
    `;
export const CustomerByIdDocument = gql`
    query customerById($id: Int!) {
  customerById(id: $id) {
    ...CustomerDetailParts
  }
}
    ${CustomerDetailPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CustomerByIdGQL extends Apollo.Query<CustomerByIdQuery, CustomerByIdQueryVariables> {
    document = CustomerByIdDocument;
    
  }
export const ConfirmSalesInvoiceDocument = gql`
    mutation confirmSalesInvoice($args: BaseSaveArgs!) {
  confirmSalesInvoice(args: $args) {
    ...SalesInvoiceListParts
  }
}
    ${SalesInvoiceListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ConfirmSalesInvoiceGQL extends Apollo.Mutation<ConfirmSalesInvoiceMutation, ConfirmSalesInvoiceMutationVariables> {
    document = ConfirmSalesInvoiceDocument;
    
  }
export const SalesInvoiceByIdDocument = gql`
    query salesInvoiceById($id: Int!) {
  salesInvoiceById(id: $id) {
    ...SalesInvoiceDetailParts
  }
}
    ${SalesInvoiceDetailPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SalesInvoiceByIdGQL extends Apollo.Query<SalesInvoiceByIdQuery, SalesInvoiceByIdQueryVariables> {
    document = SalesInvoiceByIdDocument;
    
  }
export const ProspectByIdDocument = gql`
    query prospectById($id: Int!) {
  prospectById(id: $id) {
    ...ProspectDetailParts
  }
}
    ${ProspectDetailPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProspectByIdGQL extends Apollo.Query<ProspectByIdQuery, ProspectByIdQueryVariables> {
    document = ProspectByIdDocument;
    
  }
export const CustomerDocument = gql`
    mutation customer($args: CustomerSaveArgs!) {
  customer(args: $args) {
    id
    displayName
    legalName
    vatNumber
    legalAddress {
      id
      line1
      city
      country {
        id
      }
      zipCode
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CustomerGQL extends Apollo.Mutation<CustomerMutation, CustomerMutationVariables> {
    document = CustomerDocument;
    
  }
export const SalesInvoiceLineDocument = gql`
    mutation salesInvoiceLine($args: SalesInvoiceLineSaveArgs!) {
  salesInvoiceLine(args: $args) {
    ...SalesInvoiceLineListParts
  }
}
    ${SalesInvoiceLineListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SalesInvoiceLineGQL extends Apollo.Mutation<SalesInvoiceLineMutation, SalesInvoiceLineMutationVariables> {
    document = SalesInvoiceLineDocument;
    
  }
export const ProspectDocument = gql`
    mutation prospect($args: ProspectSaveArgs!) {
  prospect(args: $args) {
    ...ProspectListParts
  }
}
    ${ProspectListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProspectGQL extends Apollo.Mutation<ProspectMutation, ProspectMutationVariables> {
    document = ProspectDocument;
    
  }
export const SalesInvoiceDocument = gql`
    mutation salesInvoice($args: SalesInvoiceSaveArgs!) {
  salesInvoice(args: $args) {
    ...SalesInvoiceListParts
  }
}
    ${SalesInvoiceListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SalesInvoiceGQL extends Apollo.Mutation<SalesInvoiceMutation, SalesInvoiceMutationVariables> {
    document = SalesInvoiceDocument;
    
  }
export const TaskDocument = gql`
    mutation task($args: TaskSaveArgs!) {
  task(args: $args) {
    ...TaskListParts
  }
}
    ${TaskListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TaskGQL extends Apollo.Mutation<TaskMutation, TaskMutationVariables> {
    document = TaskDocument;
    
  }
export const AccountsDocument = gql`
    query accounts {
  accounts {
    ...AccountListParts
  }
}
    ${AccountListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AccountsGQL extends Apollo.Query<AccountsQuery, AccountsQueryVariables> {
    document = AccountsDocument;
    
  }
export const BankAccountsDocument = gql`
    query bankAccounts {
  bankAccounts {
    ...BankAccountListParts
  }
}
    ${BankAccountListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class BankAccountsGQL extends Apollo.Query<BankAccountsQuery, BankAccountsQueryVariables> {
    document = BankAccountsDocument;
    
  }
export const CalendarActivitiesDocument = gql`
    query calendarActivities {
  calendarActivities {
    ...CalendarActivityListParts
  }
}
    ${CalendarActivityListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CalendarActivitiesGQL extends Apollo.Query<CalendarActivitiesQuery, CalendarActivitiesQueryVariables> {
    document = CalendarActivitiesDocument;
    
  }
export const CurrenciesDocument = gql`
    query currencies {
  currencies {
    ...CurrencyListParts
  }
}
    ${CurrencyListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CurrenciesGQL extends Apollo.Query<CurrenciesQuery, CurrenciesQueryVariables> {
    document = CurrenciesDocument;
    
  }
export const CustomersDocument = gql`
    query customers {
  customers {
    ...CustomerListParts
  }
}
    ${CustomerListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CustomersGQL extends Apollo.Query<CustomersQuery, CustomersQueryVariables> {
    document = CustomersDocument;
    
  }
export const SalesInvoicesDocument = gql`
    query salesInvoices {
  invoices {
    ...SalesInvoiceListParts
  }
}
    ${SalesInvoiceListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SalesInvoicesGQL extends Apollo.Query<SalesInvoicesQuery, SalesInvoicesQueryVariables> {
    document = SalesInvoicesDocument;
    
  }
export const LeadsDocument = gql`
    query leads {
  leads {
    ...LeadListParts
  }
}
    ${LeadListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LeadsGQL extends Apollo.Query<LeadsQuery, LeadsQueryVariables> {
    document = LeadsDocument;
    
  }
export const MyOrganizationsDocument = gql`
    query myOrganizations {
  myOrganizations {
    ...OrganizationListParts
  }
}
    ${OrganizationListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MyOrganizationsGQL extends Apollo.Query<MyOrganizationsQuery, MyOrganizationsQueryVariables> {
    document = MyOrganizationsDocument;
    
  }
export const ProductsDocument = gql`
    query products {
  products {
    ...ProductListParts
  }
}
    ${ProductListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProductsGQL extends Apollo.Query<ProductsQuery, ProductsQueryVariables> {
    document = ProductsDocument;
    
  }
export const ProspectsDocument = gql`
    query prospects {
  prospects {
    ...ProspectListParts
  }
}
    ${ProspectListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProspectsGQL extends Apollo.Query<ProspectsQuery, ProspectsQueryVariables> {
    document = ProspectsDocument;
    
  }
export const TasksDocument = gql`
    query tasks {
  tasks {
    ...TaskListParts
  }
}
    ${TaskListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TasksGQL extends Apollo.Query<TasksQuery, TasksQueryVariables> {
    document = TasksDocument;
    
  }
export const TaxesDocument = gql`
    query taxes {
  taxes {
    ...TaxListParts
  }
}
    ${TaxListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TaxesGQL extends Apollo.Query<TaxesQuery, TaxesQueryVariables> {
    document = TaxesDocument;
    
  }
export const UsersDocument = gql`
    query users {
  users {
    ...UserListParts
  }
}
    ${UserListPartsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    document = UsersDocument;
    
  }
export const GetServerTimeDocument = gql`
    query getServerTime {
  now
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetServerTimeGQL extends Apollo.Query<GetServerTimeQuery, GetServerTimeQueryVariables> {
    document = GetServerTimeDocument;
    
  }