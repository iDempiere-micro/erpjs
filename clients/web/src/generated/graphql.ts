export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  UniversalDateTime: any;
};

export type AccountingScheme = {
  __typename?: 'AccountingScheme';
  currency: Currency;
  displayName: Scalars['String'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  country: Country;
  customerRegistratedAddresses?: Maybe<Array<Customer>>;
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  line1: Scalars['String'];
  organizationRegisteredAddresses?: Maybe<Array<Organization>>;
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
  zipCode: Scalars['String'];
};

export type Bank = {
  __typename?: 'Bank';
  bankAccounts?: Maybe<Array<BankAccount>>;
  bankIdentifierCode: Scalars['String'];
  displayName: Scalars['String'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
};

export type BankAccount = {
  __typename?: 'BankAccount';
  bank: Bank;
  bankAccountCustomerPrintableNumber: Scalars['String'];
  displayName: Scalars['String'];
  iban: Scalars['String'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  organizations?: Maybe<Array<Organization>>;
  salesInvoices?: Maybe<Array<SalesInvoice>>;
  swift: Scalars['String'];
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
};

export type Country = {
  __typename?: 'Country';
  addresses?: Maybe<Array<Address>>;
  displayName: Scalars['String'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  isoCode: Scalars['String'];
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
};

export type Currency = {
  __typename?: 'Currency';
  currencyRatesFrom?: Maybe<Array<CurrencyRate>>;
  currencyRatesTo?: Maybe<Array<CurrencyRate>>;
  displayName: Scalars['String'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  isoCode: Scalars['String'];
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
};

export type CurrencyRate = {
  __typename?: 'CurrencyRate';
  currencyMultiplyingRate: Scalars['Float'];
  end: Scalars['DateTime'];
  from: Currency;
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  start: Scalars['DateTime'];
  to: Currency;
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
};

export type Customer = {
  __typename?: 'Customer';
  displayName: Scalars['String'];
  id: Scalars['Float'];
  idNumber: Scalars['String'];
  invoicingEmail: Scalars['String'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  legalAddress: Address;
  legalName: Scalars['String'];
  salesInvoices?: Maybe<Array<SalesInvoice>>;
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
  vatNumber?: Maybe<Scalars['String']>;
};


export type DocumentNumberSequence = {
  __typename?: 'DocumentNumberSequence';
  current: Scalars['Float'];
  forType: Scalars['String'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  organization: Organization;
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  keepAlive: Scalars['UniversalDateTime'];
};


export type MutationKeepAliveArgs = {
  clientId: Scalars['String'];
};

export type Organization = {
  __typename?: 'Organization';
  accountingScheme: AccountingScheme;
  bankAccount: BankAccount;
  contact: Scalars['String'];
  displayName: Scalars['String'];
  documentNumberSequences?: Maybe<Array<DocumentNumberSequence>>;
  id: Scalars['Float'];
  idNumber: Scalars['String'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  legalAddress: Address;
  legalName: Scalars['String'];
  registration: Scalars['String'];
  salesInvoices?: Maybe<Array<SalesInvoice>>;
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
  users?: Maybe<Array<UserToOrganization>>;
  vatNumber?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  displayName: Scalars['String'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  salesInvoiceLine?: Maybe<Array<SalesInvoiceLine>>;
  sku: Scalars['String'];
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  customer: Customer;
  customers: Array<Customer>;
  now: Scalars['UniversalDateTime'];
};


export type QueryCustomerArgs = {
  id: Scalars['Int'];
};

export type SalesInvoice = {
  __typename?: 'SalesInvoice';
  bankAccount: BankAccount;
  content?: Maybe<Scalars['String']>;
  currency: Currency;
  currencyMultiplyingRateToAccountingSchemeCurrency: Scalars['Float'];
  customer: Customer;
  documentNo?: Maybe<Scalars['String']>;
  dueDate: Scalars['DateTime'];
  grandTotal: Scalars['Float'];
  grandTotalAccountingSchemeCurrency: Scalars['Float'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCalculated: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  isDraft: Scalars['Boolean'];
  issuedOn: Scalars['DateTime'];
  lines?: Maybe<Array<SalesInvoiceLine>>;
  organization: Organization;
  paymentTermInDays: Scalars['Float'];
  printDate?: Maybe<Scalars['DateTime']>;
  printed: Scalars['Boolean'];
  printError?: Maybe<Scalars['String']>;
  reverseCharge: Scalars['Boolean'];
  totalLines: Scalars['Float'];
  totalLinesAccountingSchemeCurrency: Scalars['Float'];
  transactionDate: Scalars['DateTime'];
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
  vatReport?: Maybe<Array<SalesInvoiceVat>>;
};

export type SalesInvoiceLine = {
  __typename?: 'SalesInvoiceLine';
  id: Scalars['Float'];
  invoice: SalesInvoice;
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  lineOrder: Scalars['Float'];
  linePrice: Scalars['Float'];
  lineTax: Tax;
  narration: Scalars['String'];
  product: Product;
  quantity: Scalars['Float'];
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
};

export type SalesInvoiceVat = {
  __typename?: 'SalesInvoiceVat';
  id: Scalars['Float'];
  invoice: SalesInvoice;
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
  vatRatePercent: Scalars['Float'];
  vatTotal: Scalars['Float'];
  vatTotalAccountingSchemeCurrency: Scalars['Float'];
  vatTotalAccountingSchemeCurrencyRaw: Scalars['Float'];
  vatTotalRaw: Scalars['Float'];
};

export type Tax = {
  __typename?: 'Tax';
  displayName: Scalars['String'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  isStandard: Scalars['Boolean'];
  ratePercent: Scalars['Float'];
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
};


export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  identities?: Maybe<Array<UserIdentity>>;
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  organizations?: Maybe<Array<UserToOrganization>>;
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
  username?: Maybe<Scalars['String']>;
};

export type UserIdentity = {
  __typename?: 'UserIdentity';
  externalUser: Scalars['String'];
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  provider: Scalars['String'];
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
  user: User;
};

export type UserToOrganization = {
  __typename?: 'UserToOrganization';
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
  isCurrent: Scalars['Boolean'];
  organization: Organization;
  updtOpId: Scalars['Float'];
  updtTs: Scalars['DateTime'];
  user: User;
};

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
  ), salesInvoices?: Maybe<Array<(
    { __typename?: 'SalesInvoice' }
    & Pick<SalesInvoice, 'id'>
  )>> }
);

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & { customers: Array<(
    { __typename?: 'Customer' }
    & CustomerDetailPartsFragment
  )> }
);
