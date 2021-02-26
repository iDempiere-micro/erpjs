export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type Address = {
    __typename?: 'Address';
    city: Scalars['String'];
    country: Country;
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    line1: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['DateTime'];
    zipCode: Scalars['String'];
};

export type AddressSaveArgs = {
    city: Scalars['String'];
    countryIsoCode: Scalars['String'];
    line1: Scalars['String'];
    zipCode: Scalars['String'];
};

export type BankAccount = {
    __typename?: 'BankAccount';
    bankAccountCustomerPrintableNumber: Scalars['String'];
    displayName: Scalars['String'];
    iban: Scalars['String'];
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    swift: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['DateTime'];
};

export type Country = {
    __typename?: 'Country';
    displayName: Scalars['String'];
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    isoCode: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['DateTime'];
};

export type Currency = {
    __typename?: 'Currency';
    displayName: Scalars['String'];
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    isoCode: Scalars['String'];
    updtOp: User;
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
    salesInvoices: Array<SalesInvoice>;
    updtOp: User;
    updtTs: Scalars['DateTime'];
    vatNumber?: Maybe<Scalars['String']>;
};

export type CustomerSaveArgs = {
    displayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
    idNumber: Scalars['String'];
    invoicingEmail: Scalars['String'];
    legalAddress: AddressSaveArgs;
    legalName: Scalars['String'];
    vatNumber?: Maybe<Scalars['String']>;
};

export type Menu = {
    __typename?: 'Menu';
    displayName: Scalars['String'];
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    items: Array<MenuItem>;
    updtOp: User;
    updtTs: Scalars['DateTime'];
};

export type MenuItem = {
    __typename?: 'MenuItem';
    displayName: Scalars['String'];
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    menu: Menu;
    to: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['DateTime'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createCustomer: Customer;
    keepAlive: Scalars['UniversalDateTime'];
};

export type MutationCreateCustomerArgs = {
    args: CustomerSaveArgs;
};

export type MutationKeepAliveArgs = {
    clientId: Scalars['String'];
};

export type Organization = {
    __typename?: 'Organization';
    contact: Scalars['String'];
    displayName: Scalars['String'];
    id: Scalars['Float'];
    idNumber: Scalars['String'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    legalName: Scalars['String'];
    registration: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['DateTime'];
    vatNumber: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    customer: Customer;
    customers: Array<Customer>;
    customersByArgs: Array<Customer>;
    menu: Array<Menu>;
    now: Scalars['UniversalDateTime'];
    salesInvoice: SalesInvoice;
    salesInvoices: Array<SalesInvoice>;
};

export type QueryCustomerArgs = {
    id: Scalars['Int'];
};

export type QueryCustomersByArgsArgs = {
    displayName?: Maybe<Scalars['String']>;
    legalName?: Maybe<Scalars['String']>;
};

export type QuerySalesInvoiceArgs = {
    id: Scalars['Int'];
};

export type SalesInvoice = {
    __typename?: 'SalesInvoice';
    bankAccount: BankAccount;
    content: Scalars['String'];
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
    lines: Array<SalesInvoiceLine>;
    organization: Organization;
    paymentTermInDays: Scalars['Float'];
    printDate?: Maybe<Scalars['DateTime']>;
    printed: Scalars['Boolean'];
    printError?: Maybe<Scalars['String']>;
    printLanguageIsoCode: Scalars['String'];
    reverseCharge: Scalars['Boolean'];
    totalLines: Scalars['Float'];
    totalLinesAccountingSchemeCurrency: Scalars['Float'];
    transactionDate: Scalars['DateTime'];
    updtOp: User;
    updtTs: Scalars['DateTime'];
    vatReport: Array<SalesInvoiceVat>;
};

export type SalesInvoiceLine = {
    __typename?: 'SalesInvoiceLine';
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    lineOrder: Scalars['Float'];
    linePrice: Scalars['Float'];
    narration: Scalars['String'];
    quantity: Scalars['Float'];
    updtOp: User;
    updtTs: Scalars['DateTime'];
};

export type SalesInvoiceVat = {
    __typename?: 'SalesInvoiceVat';
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    updtOp: User;
    updtTs: Scalars['DateTime'];
    vatRatePercent: Scalars['Float'];
    vatTotal: Scalars['Float'];
    vatTotalAccountingSchemeCurrency: Scalars['Float'];
    vatTotalAccountingSchemeCurrencyRaw: Scalars['Float'];
    vatTotalRaw: Scalars['Float'];
};

export type User = {
    __typename?: 'User';
    email?: Maybe<Scalars['String']>;
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    name?: Maybe<Scalars['String']>;
    updtOpId: Scalars['Float'];
    updtTs: Scalars['DateTime'];
    username?: Maybe<Scalars['String']>;
};

export type CreateCustomerMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    displayName: Scalars['String'];
    legalName: Scalars['String'];
    legalAddressCity: Scalars['String'];
}>;

export type CreateCustomerMutation = { __typename?: 'Mutation' } & {
    createCustomer: { __typename?: 'Customer' } & Pick<Customer, 'id'>;
};

export type CustomersByArgsQueryVariables = Exact<{
    displayName?: Maybe<Scalars['String']>;
    legalName?: Maybe<Scalars['String']>;
}>;

export type CustomersByArgsQuery = { __typename?: 'Query' } & {
    customersByArgs: Array<{ __typename?: 'Customer' } & Pick<Customer, 'id'>>;
};

export type CustomerByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type CustomerByIdQuery = { __typename?: 'Query' } & {
    customer: { __typename?: 'Customer' } & Pick<
        Customer,
        'id' | 'legalName' | 'displayName' | 'vatNumber' | 'invoicingEmail'
    > & {
            legalAddress: { __typename?: 'Address' } & Pick<
                Address,
                'id' | 'city' | 'line1' | 'zipCode'
            > & { country: { __typename?: 'Country' } & Pick<Country, 'id' | 'isoCode'> };
        };
};

export type CustomersQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type CustomersQuery = { __typename?: 'Query' } & {
    customers: Array<
        { __typename?: 'Customer' } & Pick<
            Customer,
            'id' | 'legalName' | 'displayName' | 'vatNumber' | 'invoicingEmail'
        > & {
                legalAddress: { __typename?: 'Address' } & Pick<
                    Address,
                    'id' | 'city' | 'line1' | 'zipCode'
                > & { country: { __typename?: 'Country' } & Pick<Country, 'id' | 'isoCode'> };
            }
    >;
};

export type SalesInvoicesQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type SalesInvoicesQuery = { __typename?: 'Query' } & {
    salesInvoices: Array<
        { __typename?: 'SalesInvoice' } & Pick<
            SalesInvoice,
            'documentNo' | 'grandTotalAccountingSchemeCurrency'
        >
    >;
};
