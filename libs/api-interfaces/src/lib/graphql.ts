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
  countryId: Scalars['Float'],
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
}


export interface MutationSetIsCurrentArgs {
  args: GenericEntityArgs
}


export interface MutationCustomerArgs {
  args: CustomerSaveArgs
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
  now: Scalars['Date'],
  customers: Array<Customer>,
  invoices: Array<SalesInvoice>,
}


export interface QueryGetIsCurrentArgs {
  args: GenericEntityArgs
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

export interface CustomersQueryVariables {}


export type CustomersQuery = (
  { __typename?: 'Query' }
  & { customers: Array<(
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
  )> }
);

export interface SalesInvoicesQueryVariables {}


export type SalesInvoicesQuery = (
  { __typename?: 'Query' }
  & { invoices: Array<(
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
  )> }
);

export interface GetServerTimeQueryVariables {}


export type GetServerTimeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'now'>
);


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
export const CustomersDocument = gql`
    query customers {
  customers {
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
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CustomersGQL extends Apollo.Query<CustomersQuery, CustomersQueryVariables> {
    document = CustomersDocument;
    
  }
export const SalesInvoicesDocument = gql`
    query salesInvoices {
  invoices {
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
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SalesInvoicesGQL extends Apollo.Query<SalesInvoicesQuery, SalesInvoicesQueryVariables> {
    document = SalesInvoicesDocument;
    
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