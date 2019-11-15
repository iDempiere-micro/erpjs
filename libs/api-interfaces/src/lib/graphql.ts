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
  bankIdentifierCode: Scalars['String'],
  displayName: Scalars['String'],
  bankAccounts?: Maybe<Array<BankAccount>>,
}

export interface BankAccount {
   __typename?: 'BankAccount',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  iban: Scalars['String'],
  swift: Scalars['String'],
  bank: Bank,
  bankAccountCustomerPrintableNumber: Scalars['String'],
  displayName: Scalars['String'],
  salesInvoices?: Maybe<Array<SalesInvoice>>,
  organizations?: Maybe<Array<Organization>>,
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
  customer: Customer,
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
  salesInvoices?: Maybe<Array<SalesInvoice>>,
  accountingSchemas?: Maybe<Array<AccountingScheme>>,
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
}

export interface CustomerSaveArgs {
  id?: Maybe<Scalars['Float']>,
  legalAddress: AddressSaveArgs,
  displayName: Scalars['String'],
  vatNumber?: Maybe<Scalars['String']>,
  legalName: Scalars['String'],
  invoicingEmail: Scalars['String'],
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

export interface LoginArgs {
  username: Scalars['String'],
  password: Scalars['String'],
}

export interface Mutation {
   __typename?: 'Mutation',
  setIsCurrent: GenericEntityResult,
  customer: Customer,
  task: Task,
}


export interface MutationSetIsCurrentArgs {
  args: GenericEntityArgs
}


export interface MutationCustomerArgs {
  args: CustomerSaveArgs
}


export interface MutationTaskArgs {
  args: TaskSaveArgs
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
  bankAccount: BankAccount,
  accountingScheme: AccountingScheme,
  users?: Maybe<Array<UserToOrganization>>,
  documentNumberSequences?: Maybe<Array<DocumentNumberSequence>>,
  registration: Scalars['String'],
}

export interface Product {
   __typename?: 'Product',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  buyingAccount: Account,
  displayName: Scalars['String'],
  sellingAccount: Account,
  salesInvoiceLine?: Maybe<Array<SalesInvoiceLine>>,
  sku: Scalars['String'],
}

export interface Query {
   __typename?: 'Query',
  getIsCurrent: Array<GenericEntityResult>,
  now: Scalars['DateTime'],
  customers: Array<Customer>,
  customerById: Customer,
  invoices: Array<SalesInvoice>,
  tasks: Array<Task>,
  calendarActivities: Array<CalendarActivity>,
  users: Array<AppUser>,
}


export interface QueryGetIsCurrentArgs {
  args: GenericEntityArgs
}


export interface QueryCustomerByIdArgs {
  id: Scalars['Int']
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
  documentNo: Scalars['String'],
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

export interface Task {
   __typename?: 'Task',
  id: Scalars['Float'],
  updtTs: Scalars['Date'],
  updtOpId: Scalars['Float'],
  isActive: Scalars['Boolean'],
  isCurrent: Scalars['Boolean'],
  completed: Scalars['Boolean'],
  customer: Customer,
  description?: Maybe<Scalars['String']>,
  displayName: Scalars['String'],
  dueDate: Scalars['Date'],
  invoiceLines?: Maybe<Array<SalesInvoiceLine>>,
  workLogs?: Maybe<Array<WorkLog>>,
  owner: AppUser,
  responsible: AppUser,
}

export interface TaskSaveArgs {
  id?: Maybe<Scalars['Float']>,
  customerId: Scalars['Float'],
  dueDate: Scalars['Date'],
  ownerId: Scalars['Float'],
  responsibleId: Scalars['Float'],
  displayName: Scalars['String'],
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
  salesInvoiceLine?: Maybe<Array<SalesInvoiceLine>>,
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
  & Pick<Customer, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'legalName' | 'vatNumber' | 'invoicingEmail'>
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

export type CalendarActivityListPartsFragment = (
  { __typename?: 'CalendarActivity' }
  & Pick<CalendarActivity, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'start' | 'end'>
  & { owner: (
    { __typename?: 'AppUser' }
    & UserListPartsFragment
  ), customer: (
    { __typename?: 'Customer' }
    & CustomerListPartsFragment
  ) }
);

export interface CalendarActivitiesQueryVariables {}


export type CalendarActivitiesQuery = (
  { __typename?: 'Query' }
  & { calendarActivities: Array<(
    { __typename?: 'CalendarActivity' }
    & CalendarActivityListPartsFragment
  )> }
);

export type CustomerListPartsFragment = (
  { __typename?: 'Customer' }
  & Pick<Customer, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'legalName' | 'vatNumber' | 'invoicingEmail'>
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

export type TaskListPartsFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'displayName' | 'dueDate'>
  & { owner: (
    { __typename?: 'AppUser' }
    & UserListPartsFragment
  ), responsible: (
    { __typename?: 'AppUser' }
    & UserListPartsFragment
  ), customer: (
    { __typename?: 'Customer' }
    & CustomerListPartsFragment
  ) }
);

export interface TasksQueryVariables {}


export type TasksQuery = (
  { __typename?: 'Query' }
  & { tasks: Array<(
    { __typename?: 'Task' }
    & TaskListPartsFragment
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
    `;
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
}
    ${UserListPartsFragmentDoc}
${CustomerListPartsFragmentDoc}`;
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
}
    ${UserListPartsFragmentDoc}
${CustomerListPartsFragmentDoc}`;
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
}
    ${SalesInvoiceListPartsFragmentDoc}
${CalendarActivityListPartsFragmentDoc}
${TaskListPartsFragmentDoc}`;
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