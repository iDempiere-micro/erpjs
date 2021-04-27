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
    /** Date custom scalar type */
    Date: any;
    UniversalDateTime: any;
};

export type AccountingScheme = {
    __typename?: 'AccountingScheme';
    currency: Currency;
    displayName: Scalars['String'];
    id: Scalars['Int'];
    updtOp: User;
};

export type AccountingSchemeSaveArgs = {
    currencyIsoCode: Scalars['String'];
    displayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
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
    updtTs: Scalars['UniversalDateTime'];
    zipCode: Scalars['String'];
};

export type AddressSaveArgs = {
    city: Scalars['String'];
    countryIsoCode: Scalars['String'];
    line1: Scalars['String'];
    zipCode: Scalars['String'];
};

export type Bank = {
    __typename?: 'Bank';
    bankIdentifierCode: Scalars['String'];
    displayName: Scalars['String'];
    id: Scalars['Float'];
    updtOp: User;
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
    swift: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
};

export type BankAccountSaveArgs = {
    bankAccountCustomerPrintableNumber: Scalars['String'];
    bankId: Scalars['Float'];
    displayName: Scalars['String'];
    iban: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
    swift: Scalars['String'];
};

export type BankSaveArgs = {
    bankIdentifierCode: Scalars['String'];
    displayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
};

export type BaseSaveArgs = {
    id?: Maybe<Scalars['Int']>;
};

export type ContactPerson = {
    __typename?: 'ContactPerson';
    contactPersonCompanyRelations?: Maybe<Array<ContactPersonCompanyRelation>>;
    firstName: Scalars['String'];
    id: Scalars['Int'];
    lastName: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
};

export type ContactPersonCompanyRelation = {
    __typename?: 'ContactPersonCompanyRelation';
    contactPerson: ContactPerson;
    customer: Customer;
    id: Scalars['Int'];
    isActive: Scalars['Boolean'];
    role: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
};

export type ContactPersonCompanyRelationSaveArgs = {
    contactPersonId: Scalars['Float'];
    customerId: Scalars['Float'];
    id?: Maybe<Scalars['Int']>;
    isActive: Scalars['Boolean'];
    role: Scalars['String'];
};

export type ContactPersonSaveArgs = {
    firstName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
    lastName: Scalars['String'];
};

export type Country = {
    __typename?: 'Country';
    displayName: Scalars['String'];
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    isoCode: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
};

export type CountrySaveArgs = {
    displayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
    isoCode: Scalars['String'];
};

export type Currency = {
    __typename?: 'Currency';
    displayName: Scalars['String'];
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    isoCode: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
};

export type CurrencySaveArgs = {
    displayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
    isoCode: Scalars['String'];
};

export type Customer = {
    __typename?: 'Customer';
    address?: Maybe<Address>;
    contactPersonCompanyRelations?: Maybe<Array<ContactPersonCompanyRelation>>;
    customerGroup?: Maybe<CustomerGroup>;
    displayName: Scalars['String'];
    id: Scalars['Int'];
    idNumber: Scalars['String'];
    invoicingEmail: Scalars['String'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    legalAddress: Address;
    legalName: Scalars['String'];
    note?: Maybe<Scalars['String']>;
    publicNote?: Maybe<Scalars['String']>;
    salesInvoices: Array<SalesInvoice>;
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
    vatNumber?: Maybe<Scalars['String']>;
    www?: Maybe<Scalars['String']>;
};

export type CustomerGroup = {
    __typename?: 'CustomerGroup';
    customerPriceLists?: Maybe<Array<CustomerPriceList>>;
    customers?: Maybe<Array<Customer>>;
    displayName: Scalars['String'];
    id: Scalars['Int'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
};

export type CustomerGroupSaveArgs = {
    displayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
};

export type CustomerPriceList = {
    __typename?: 'CustomerPriceList';
    customerGroup: CustomerGroup;
    displayName: Scalars['String'];
    id: Scalars['Int'];
    productPrices?: Maybe<Array<CustomerProductPrice>>;
    validFrom?: Maybe<Scalars['Date']>;
    validTo?: Maybe<Scalars['Date']>;
};

export type CustomerPriceListSaveArgs = {
    customerGroupDisplayName: Scalars['String'];
    displayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
    productPrices: Array<ProductPriceSaveArgs>;
    validFrom: Scalars['Date'];
    validTo: Scalars['Date'];
};

export type CustomerProductPrice = {
    __typename?: 'CustomerProductPrice';
    currency: Currency;
    id: Scalars['Int'];
    product: Product;
    sellingPrice: Scalars['Float'];
};

export type CustomerProductPriceSaveArgs = {
    currencyId: Scalars['Float'];
    customerPriceListId: Scalars['Float'];
    id?: Maybe<Scalars['Int']>;
    productId: Scalars['Float'];
    sellingPrice: Scalars['Float'];
};

export type CustomerSaveArgs = {
    address?: Maybe<AddressSaveArgs>;
    customerGroupId?: Maybe<Scalars['Int']>;
    displayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
    idNumber: Scalars['String'];
    invoicingEmail: Scalars['String'];
    legalAddress: AddressSaveArgs;
    legalName: Scalars['String'];
    note?: Maybe<Scalars['String']>;
    vatNumber?: Maybe<Scalars['String']>;
};

export type DocumentNumberSequence = {
    __typename?: 'DocumentNumberSequence';
    current: Scalars['Float'];
    forType: Scalars['String'];
    id: Scalars['Int'];
    updtOp: User;
};

export type FactoringProvider = {
    __typename?: 'FactoringProvider';
    bankAccount: BankAccount;
    contact: Scalars['String'];
    displayName: Scalars['String'];
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    legalName: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
};

export type FactoringProviderSaveArgs = {
    contact: Scalars['String'];
    displayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
    legalName: Scalars['String'];
    newBankAccount: BankAccountSaveArgs;
};

export type IdAndNumber = {
    id: Scalars['Float'];
    value: Scalars['Float'];
};

export type Menu = {
    __typename?: 'Menu';
    displayName: Scalars['String'];
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    items: Array<MenuItem>;
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
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
    updtTs: Scalars['UniversalDateTime'];
};

export type Mutation = {
    __typename?: 'Mutation';
    confirmSalesInvoice: SalesInvoice;
    createCustomer: Customer;
    createMonthlyInvoice: Array<SalesInvoice>;
    createSalesInvoice: SalesInvoice;
    keepAlive: Scalars['UniversalDateTime'];
    saveAccountingScheme: AccountingScheme;
    saveBank: Bank;
    saveContactPerson: ContactPerson;
    saveContactPersonCompanyRelation: ContactPersonCompanyRelation;
    saveCountry: Country;
    saveCurrency: Currency;
    saveCustomerGroup: CustomerGroup;
    saveCustomerPriceList: CustomerPriceList;
    saveCustomerProductPrice: CustomerProductPrice;
    saveFactoringProvider: FactoringProvider;
    saveOrganization: Organization;
    saveProduct: Product;
};

export type MutationConfirmSalesInvoiceArgs = {
    args: BaseSaveArgs;
};

export type MutationCreateCustomerArgs = {
    args: CustomerSaveArgs;
};

export type MutationCreateMonthlyInvoiceArgs = {
    args: SalesInvoiceMonthlySaveArgs;
};

export type MutationCreateSalesInvoiceArgs = {
    args: SalesInvoiceSaveArgs;
};

export type MutationSaveAccountingSchemeArgs = {
    args: AccountingSchemeSaveArgs;
};

export type MutationSaveBankArgs = {
    args: BankSaveArgs;
};

export type MutationSaveContactPersonArgs = {
    args: ContactPersonSaveArgs;
};

export type MutationSaveContactPersonCompanyRelationArgs = {
    args: ContactPersonCompanyRelationSaveArgs;
};

export type MutationSaveCountryArgs = {
    args: CountrySaveArgs;
};

export type MutationSaveCurrencyArgs = {
    args: CurrencySaveArgs;
};

export type MutationSaveCustomerGroupArgs = {
    args: CustomerGroupSaveArgs;
};

export type MutationSaveCustomerPriceListArgs = {
    args: CustomerPriceListSaveArgs;
};

export type MutationSaveCustomerProductPriceArgs = {
    args: CustomerProductPriceSaveArgs;
};

export type MutationSaveFactoringProviderArgs = {
    args: FactoringProviderSaveArgs;
};

export type MutationSaveOrganizationArgs = {
    args: OrganizationSaveArgs;
};

export type MutationSaveProductArgs = {
    args: ProductSaveArgs;
};

export type Organization = {
    __typename?: 'Organization';
    accountingScheme: AccountingScheme;
    bankAccount: BankAccount;
    contact: Scalars['String'];
    displayName: Scalars['String'];
    documentNumberSequences: DocumentNumberSequence;
    id: Scalars['Float'];
    idNumber: Scalars['String'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    legalAddress: Address;
    legalName: Scalars['String'];
    registration: Scalars['String'];
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
    vatNumber: Scalars['String'];
};

export type OrganizationSaveArgs = {
    accountingSchemeId: Scalars['Int'];
    contact: Scalars['String'];
    currentInvoiceDocumentNumber: Scalars['Float'];
    displayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
    idNumber: Scalars['String'];
    legalAddress: AddressSaveArgs;
    legalName: Scalars['String'];
    newBankAccount: BankAccountSaveArgs;
    registration: Scalars['String'];
    vatNumber?: Maybe<Scalars['String']>;
};

export type Product = {
    __typename?: 'Product';
    customerProductPrices?: Maybe<Array<CustomerProductPrice>>;
    defaultUoM?: Maybe<UnitOfMeasurement>;
    displayName: Scalars['String'];
    id: Scalars['Float'];
    sku: Scalars['String'];
    updtOp: User;
};

export type ProductPriceSaveArgs = {
    currencyId: Scalars['Float'];
    productId: Scalars['Float'];
    sellingPrice: Scalars['Float'];
};

export type ProductSaveArgs = {
    displayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
    sku: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    accountingScheme: AccountingScheme;
    accountingSchemes: Array<AccountingScheme>;
    bank: Bank;
    banks: Array<Bank>;
    contactPerson: ContactPerson;
    contactPersonCompanyRelation: ContactPersonCompanyRelation;
    contactPersonCompanyRelations: Array<ContactPersonCompanyRelation>;
    contactPersons: Array<ContactPerson>;
    countries: Array<Country>;
    country: Country;
    currencies: Array<Currency>;
    currency: Currency;
    customer: Customer;
    customerGroup: CustomerGroup;
    customerGroups: Array<CustomerGroup>;
    customerPriceList: CustomerPriceList;
    customerPriceLists: Array<CustomerPriceList>;
    customerProductPrice: CustomerProductPrice;
    customerProductPrices: Array<CustomerProductPrice>;
    customers: Array<Customer>;
    customersByArgs: Array<Customer>;
    factoringProvider: FactoringProvider;
    factoringProviders: Array<FactoringProvider>;
    menu: Array<Menu>;
    now: Scalars['UniversalDateTime'];
    organization: Organization;
    organizations: Array<Organization>;
    product: Product;
    products: Array<Product>;
    salesInvoice: SalesInvoice;
    salesInvoices: Array<SalesInvoice>;
    salesInvoicesReport: Array<SalesInvoicesInTime>;
};

export type QueryAccountingSchemeArgs = {
    id: Scalars['Int'];
};

export type QueryBankArgs = {
    id: Scalars['Int'];
};

export type QueryContactPersonArgs = {
    id: Scalars['Int'];
};

export type QueryContactPersonCompanyRelationArgs = {
    id: Scalars['Int'];
};

export type QueryCountryArgs = {
    id: Scalars['Int'];
};

export type QueryCurrencyArgs = {
    id: Scalars['Int'];
};

export type QueryCustomerArgs = {
    id: Scalars['Int'];
};

export type QueryCustomerGroupArgs = {
    id: Scalars['Int'];
};

export type QueryCustomerPriceListArgs = {
    id: Scalars['Int'];
};

export type QueryCustomerProductPriceArgs = {
    id: Scalars['Int'];
};

export type QueryCustomersByArgsArgs = {
    displayName?: Maybe<Scalars['String']>;
    legalName?: Maybe<Scalars['String']>;
};

export type QueryFactoringProviderArgs = {
    id: Scalars['Int'];
};

export type QueryOrganizationArgs = {
    id: Scalars['Int'];
};

export type QueryProductArgs = {
    id: Scalars['Int'];
};

export type QuerySalesInvoiceArgs = {
    id: Scalars['Int'];
};

export type SalesInvoice = {
    __typename?: 'SalesInvoice';
    bankAccount: BankAccount;
    currency: Currency;
    currencyMultiplyingRateToAccountingSchemeCurrency: Scalars['Float'];
    customer: Customer;
    documentNo?: Maybe<Scalars['String']>;
    dueDate: Scalars['Date'];
    factoringProvider: FactoringProvider;
    grandTotal: Scalars['Float'];
    grandTotalAccountingSchemeCurrency: Scalars['Float'];
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCalculated: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    isDraft: Scalars['Boolean'];
    issuedOn: Scalars['Date'];
    lines: Array<SalesInvoiceLine>;
    organization: Organization;
    paymentTermInDays: Scalars['Float'];
    printDate?: Maybe<Scalars['Date']>;
    printError?: Maybe<Scalars['String']>;
    printLanguageIsoCode: Scalars['String'];
    printed: Scalars['Boolean'];
    reverseCharge: Scalars['Boolean'];
    totalLines: Scalars['Float'];
    totalLinesAccountingSchemeCurrency: Scalars['Float'];
    transactionDate: Scalars['Date'];
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
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
    product: Product;
    quantity: Scalars['Float'];
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
};

export type SalesInvoiceLineSaveArgs = {
    id?: Maybe<Scalars['Int']>;
    lineOrder: Scalars['Float'];
    linePrice: Scalars['Float'];
    lineTaxId?: Maybe<Scalars['Float']>;
    lineTaxIsStandard: Scalars['Boolean'];
    narration: Scalars['String'];
    productId: Scalars['Float'];
    quantity: Scalars['Float'];
};

export type SalesInvoiceMonthlySaveArgs = {
    dailyRate: Scalars['Float'];
    day: Scalars['Int'];
    eurToCzkRate: Scalars['Float'];
    month: Scalars['Int'];
    narration: Scalars['String'];
    organizationDivider: Array<IdAndNumber>;
    totalHours: Scalars['Float'];
    year: Scalars['Int'];
};

export type SalesInvoiceSaveArgs = {
    currencyIsoCode: Scalars['String'];
    customerDisplayName: Scalars['String'];
    id?: Maybe<Scalars['Int']>;
    issuedOn: Scalars['Date'];
    lines: Array<SalesInvoiceLineSaveArgs>;
    organizationDisplayName: Scalars['String'];
    paymentTermInDays: Scalars['Int'];
    transactionDate: Scalars['Date'];
};

export type SalesInvoiceVat = {
    __typename?: 'SalesInvoiceVat';
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    updtOp: User;
    updtTs: Scalars['UniversalDateTime'];
    vatRatePercent: Scalars['Float'];
    vatTotal: Scalars['Float'];
    vatTotalAccountingSchemeCurrency: Scalars['Float'];
    vatTotalAccountingSchemeCurrencyRaw: Scalars['Float'];
    vatTotalRaw: Scalars['Float'];
};

export type SalesInvoicesInTime = {
    __typename?: 'SalesInvoicesInTime';
    date: Scalars['String'];
    group: Scalars['String'];
    value: Scalars['Float'];
};

export type UnitOfMeasurement = {
    __typename?: 'UnitOfMeasurement';
    conversionRates: Array<UnitOfMeasurementConversion>;
    conversionRates2: Array<UnitOfMeasurementConversion>;
    displayName: Scalars['String'];
    id: Scalars['Float'];
    updtOp: User;
};

export type UnitOfMeasurementConversion = {
    __typename?: 'UnitOfMeasurementConversion';
    from: UnitOfMeasurement;
    id: Scalars['Float'];
    to: UnitOfMeasurement;
    unitMultiplyingRate: Scalars['Float'];
    updtOp: User;
};

export type User = {
    __typename?: 'User';
    email?: Maybe<Scalars['String']>;
    id: Scalars['Float'];
    isActive: Scalars['Boolean'];
    isCurrent: Scalars['Boolean'];
    name?: Maybe<Scalars['String']>;
    updtOpId: Scalars['Float'];
    updtTs: Scalars['UniversalDateTime'];
    username?: Maybe<Scalars['String']>;
};

export type SaveAccountingSchemeMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    displayName: Scalars['String'];
    currencyIsoCode: Scalars['String'];
}>;

export type SaveAccountingSchemeMutation = { __typename?: 'Mutation' } & {
    saveAccountingScheme: { __typename?: 'AccountingScheme' } & Pick<AccountingScheme, 'id'>;
};

export type SaveBankMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    displayName: Scalars['String'];
    bankIdentifierCode: Scalars['String'];
}>;

export type SaveBankMutation = { __typename?: 'Mutation' } & {
    saveBank: { __typename?: 'Bank' } & Pick<Bank, 'id'>;
};

export type SaveCountryMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    displayName: Scalars['String'];
    isoCode: Scalars['String'];
}>;

export type SaveCountryMutation = { __typename?: 'Mutation' } & {
    saveCountry: { __typename?: 'Country' } & Pick<Country, 'id'>;
};

export type SaveCurrencyMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    displayName: Scalars['String'];
    isoCode: Scalars['String'];
}>;

export type SaveCurrencyMutation = { __typename?: 'Mutation' } & {
    saveCurrency: { __typename?: 'Currency' } & Pick<Currency, 'id'>;
};

export type CreateCustomerMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    displayName: Scalars['String'];
    legalName: Scalars['String'];
    legalAddressCity: Scalars['String'];
    note?: Maybe<Scalars['String']>;
    idNumber: Scalars['String'];
    legalAddressCountryIsoCode: Scalars['String'];
    legalAddressLine1: Scalars['String'];
    legalAddressZipCode: Scalars['String'];
    invoicingEmail: Scalars['String'];
    vatNumber?: Maybe<Scalars['String']>;
    customerGroupId?: Maybe<Scalars['Int']>;
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

export type SaveCustomerGroupMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    displayName: Scalars['String'];
}>;

export type SaveCustomerGroupMutation = { __typename?: 'Mutation' } & {
    saveCustomerGroup: { __typename?: 'CustomerGroup' } & Pick<CustomerGroup, 'id'>;
};

export type CreateMonthlyInvoiceMutationVariables = Exact<{
    totalHours: Scalars['Float'];
    dailyRate: Scalars['Float'];
    organizationDivider: Array<IdAndNumber> | IdAndNumber;
    year: Scalars['Int'];
    month: Scalars['Int'];
    day: Scalars['Int'];
    eurToCzkRate: Scalars['Float'];
    narration: Scalars['String'];
}>;

export type CreateMonthlyInvoiceMutation = { __typename?: 'Mutation' } & {
    createMonthlyInvoice: Array<{ __typename?: 'SalesInvoice' } & Pick<SalesInvoice, 'id'>>;
};

export type SaveOrganizationMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    displayName: Scalars['String'];
    accountingSchemeId: Scalars['Int'];
    contact: Scalars['String'];
    idNumber: Scalars['String'];
    legalAddress: AddressSaveArgs;
    legalName: Scalars['String'];
    newBankAccount: BankAccountSaveArgs;
    registration: Scalars['String'];
    vatNumber?: Maybe<Scalars['String']>;
    currentInvoiceDocumentNumber: Scalars['Float'];
}>;

export type SaveOrganizationMutation = { __typename?: 'Mutation' } & {
    saveOrganization: { __typename?: 'Organization' } & Pick<Organization, 'id'>;
};

export type SaveProductMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    displayName: Scalars['String'];
    sku: Scalars['String'];
}>;

export type SaveProductMutation = { __typename?: 'Mutation' } & {
    saveProduct: { __typename?: 'Product' } & Pick<Product, 'id'>;
};

export type CreateSalesInvoiceMutationVariables = Exact<{
    id?: Maybe<Scalars['Int']>;
    currencyIsoCode: Scalars['String'];
    customerDisplayName: Scalars['String'];
    issuedOn: Scalars['Date'];
    lines: Array<SalesInvoiceLineSaveArgs> | SalesInvoiceLineSaveArgs;
    organizationDisplayName: Scalars['String'];
    paymentTermInDays: Scalars['Int'];
    transactionDate: Scalars['Date'];
}>;

export type CreateSalesInvoiceMutation = { __typename?: 'Mutation' } & {
    createSalesInvoice: { __typename?: 'SalesInvoice' } & Pick<SalesInvoice, 'id'>;
};

export type SalesInvoicesInTimeQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type SalesInvoicesInTimeQuery = { __typename?: 'Query' } & {
    salesInvoicesReport: Array<
        { __typename?: 'SalesInvoicesInTime' } & Pick<
            SalesInvoicesInTime,
            'group' | 'date' | 'value'
        >
    >;
};

export type AccountingSchemeDetailPartsFragment = { __typename?: 'AccountingScheme' } & Pick<
    AccountingScheme,
    'id' | 'displayName'
> & { currency: { __typename?: 'Currency' } & Pick<Currency, 'id' | 'isoCode' | 'displayName'> };

export type AccountingSchemeListPartsFragment = { __typename?: 'AccountingScheme' } & Pick<
    AccountingScheme,
    'id' | 'displayName'
> & { currency: { __typename?: 'Currency' } & Pick<Currency, 'id' | 'isoCode' | 'displayName'> };

export type AccountingSchemeByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type AccountingSchemeByIdQuery = { __typename?: 'Query' } & {
    accountingScheme: { __typename?: 'AccountingScheme' } & AccountingSchemeDetailPartsFragment;
};

export type BankAccountDetailPartsFragment = { __typename?: 'BankAccount' } & Pick<
    BankAccount,
    'id' | 'displayName' | 'bankAccountCustomerPrintableNumber' | 'iban' | 'swift'
> & { bank: { __typename?: 'Bank' } & BankListPartsFragment };

export type BankAccountListPartsFragment = { __typename?: 'BankAccount' } & Pick<
    BankAccount,
    'id' | 'displayName' | 'bankAccountCustomerPrintableNumber' | 'iban' | 'swift'
> & { bank: { __typename?: 'Bank' } & BankListPartsFragment };

export type BankDetailPartsFragment = { __typename?: 'Bank' } & Pick<
    Bank,
    'id' | 'displayName' | 'bankIdentifierCode'
>;

export type BankListPartsFragment = { __typename?: 'Bank' } & Pick<
    Bank,
    'id' | 'displayName' | 'bankIdentifierCode'
>;

export type BankByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type BankByIdQuery = { __typename?: 'Query' } & {
    bank: { __typename?: 'Bank' } & BankDetailPartsFragment;
};

export type CountryDetailPartsFragment = { __typename?: 'Country' } & Pick<
    Country,
    'id' | 'displayName' | 'isoCode'
>;

export type CountryByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type CountryByIdQuery = { __typename?: 'Query' } & {
    country: { __typename?: 'Country' } & CountryDetailPartsFragment;
};

export type CurrencyDetailPartsFragment = { __typename?: 'Currency' } & Pick<
    Currency,
    'id' | 'displayName' | 'isoCode'
>;

export type CurrencyByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type CurrencyByIdQuery = { __typename?: 'Query' } & {
    currency: { __typename?: 'Currency' } & CurrencyDetailPartsFragment;
};

export type CustomerDetailPartsFragment = { __typename?: 'Customer' } & Pick<
    Customer,
    | 'id'
    | 'legalName'
    | 'displayName'
    | 'vatNumber'
    | 'idNumber'
    | 'invoicingEmail'
    | 'note'
    | 'www'
    | 'publicNote'
> & {
        legalAddress: { __typename?: 'Address' } & AddressListPartsFragment;
        address?: Maybe<{ __typename?: 'Address' } & AddressListPartsFragment>;
        customerGroup?: Maybe<{ __typename?: 'CustomerGroup' } & CustomerGroupListPartsFragment>;
    };

export type CustomerByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type CustomerByIdQuery = { __typename?: 'Query' } & {
    customer: { __typename?: 'Customer' } & CustomerDetailPartsFragment;
};

export type CustomerGroupDetailPartsFragment = { __typename?: 'CustomerGroup' } & Pick<
    CustomerGroup,
    'id' | 'displayName'
> & {
        customers?: Maybe<Array<{ __typename?: 'Customer' } & CustomerListPartsFragment>>;
        customerPriceLists?: Maybe<
            Array<{ __typename?: 'CustomerPriceList' } & CustomerPriceListPartsFragment>
        >;
    };

export type CustomerGroupListPartsFragment = { __typename?: 'CustomerGroup' } & Pick<
    CustomerGroup,
    'id' | 'displayName'
>;

export type CustomerGroupByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type CustomerGroupByIdQuery = { __typename?: 'Query' } & {
    customerGroup: { __typename?: 'CustomerGroup' } & CustomerGroupDetailPartsFragment;
};

export type OrganizationDetailPartsFragment = { __typename?: 'Organization' } & Pick<
    Organization,
    'id' | 'displayName' | 'legalName' | 'registration' | 'contact' | 'idNumber' | 'vatNumber'
> & {
        legalAddress: { __typename?: 'Address' } & AddressListPartsFragment;
        bankAccount: { __typename?: 'BankAccount' } & BankAccountListPartsFragment;
        accountingScheme: { __typename?: 'AccountingScheme' } & AccountingSchemeDetailPartsFragment;
        documentNumberSequences: { __typename?: 'DocumentNumberSequence' } & Pick<
            DocumentNumberSequence,
            'current'
        >;
    };

export type OrganizationByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type OrganizationByIdQuery = { __typename?: 'Query' } & {
    organization: { __typename?: 'Organization' } & OrganizationDetailPartsFragment;
};

export type ProductDetailPartsFragment = { __typename?: 'Product' } & Pick<
    Product,
    'id' | 'displayName' | 'sku'
> & {
        defaultUoM?: Maybe<
            { __typename?: 'UnitOfMeasurement' } & UnitOfMeasurementDetailPartsFragment
        >;
    };

export type ProductByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type ProductByIdQuery = { __typename?: 'Query' } & {
    product: { __typename?: 'Product' } & ProductDetailPartsFragment;
};

export type SalesInvoiceDetailPartsFragment = { __typename?: 'SalesInvoice' } & Pick<
    SalesInvoice,
    | 'documentNo'
    | 'dueDate'
    | 'grandTotal'
    | 'grandTotalAccountingSchemeCurrency'
    | 'id'
    | 'isActive'
    | 'isCalculated'
    | 'isCurrent'
    | 'isDraft'
    | 'issuedOn'
    | 'paymentTermInDays'
    | 'printDate'
    | 'printed'
    | 'printError'
    | 'printLanguageIsoCode'
    | 'reverseCharge'
    | 'totalLines'
    | 'totalLinesAccountingSchemeCurrency'
    | 'transactionDate'
> & {
        currency: { __typename?: 'Currency' } & CurrencyListPartsFragment;
        customer: { __typename?: 'Customer' } & CustomerListPartsFragment;
        lines: Array<{ __typename?: 'SalesInvoiceLine' } & SalesInvoiceLineDetailPartsFragment>;
        organization: { __typename?: 'Organization' } & OrganizationDetailPartsFragment;
        vatReport: Array<{ __typename?: 'SalesInvoiceVat' } & SalesInvoiceVatDetailPartsFragment>;
    };

export type SalesInvoiceByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type SalesInvoiceByIdQuery = { __typename?: 'Query' } & {
    salesInvoice: { __typename?: 'SalesInvoice' } & SalesInvoiceDetailPartsFragment;
};

export type SalesInvoiceLineDetailPartsFragment = { __typename?: 'SalesInvoiceLine' } & Pick<
    SalesInvoiceLine,
    'id' | 'lineOrder' | 'linePrice' | 'narration' | 'quantity'
> & { product: { __typename?: 'Product' } & Pick<Product, 'id'> };

export type SalesInvoiceVatDetailPartsFragment = { __typename?: 'SalesInvoiceVat' } & Pick<
    SalesInvoiceVat,
    | 'id'
    | 'vatRatePercent'
    | 'vatTotal'
    | 'vatTotalAccountingSchemeCurrency'
    | 'vatTotalAccountingSchemeCurrencyRaw'
    | 'vatTotalRaw'
>;

export type UnitOfMeasurementDetailPartsFragment = { __typename?: 'UnitOfMeasurement' } & Pick<
    UnitOfMeasurement,
    'id' | 'displayName'
>;

export type MenuQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type MenuQuery = { __typename?: 'Query' } & {
    menu: Array<{ __typename?: 'Menu' } & MenuListPartsFragment>;
};

export type MenuListPartsFragment = { __typename?: 'Menu' } & Pick<Menu, 'id' | 'displayName'> & {
        items: Array<{ __typename?: 'MenuItem' } & MenuItemListPartsFragment>;
    };

export type MenuItemListPartsFragment = { __typename?: 'MenuItem' } & Pick<
    MenuItem,
    'id' | 'to' | 'displayName'
>;

export type AccountingSchemesQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type AccountingSchemesQuery = { __typename?: 'Query' } & {
    accountingSchemes: Array<
        { __typename?: 'AccountingScheme' } & AccountingSchemeListPartsFragment
    >;
};

export type AddressListPartsFragment = { __typename?: 'Address' } & Pick<
    Address,
    'id' | 'city' | 'line1' | 'zipCode'
> & { country: { __typename?: 'Country' } & CountryListPartsFragment };

export type BanksQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type BanksQuery = { __typename?: 'Query' } & {
    banks: Array<{ __typename?: 'Bank' } & BankListPartsFragment>;
};

export type ConfirmSalesInvoiceMutationVariables = Exact<{
    id: Scalars['Int'];
}>;

export type ConfirmSalesInvoiceMutation = { __typename?: 'Mutation' } & {
    confirmSalesInvoice: { __typename?: 'SalesInvoice' } & SalesInvoiceDetailPartsFragment;
};

export type CountriesQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type CountriesQuery = { __typename?: 'Query' } & {
    countries: Array<{ __typename?: 'Country' } & CountryListPartsFragment>;
};

export type CountryListPartsFragment = { __typename?: 'Country' } & Pick<
    Country,
    'id' | 'displayName' | 'isoCode'
>;

export type CurrenciesQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type CurrenciesQuery = { __typename?: 'Query' } & {
    currencies: Array<{ __typename?: 'Currency' } & CurrencyListPartsFragment>;
};

export type CurrencyListPartsFragment = { __typename?: 'Currency' } & Pick<
    Currency,
    'id' | 'isoCode' | 'displayName'
>;

export type CustomerListPartsFragment = { __typename?: 'Customer' } & Pick<
    Customer,
    'id' | 'legalName' | 'displayName' | 'vatNumber' | 'invoicingEmail' | 'note'
> & {
        legalAddress: { __typename?: 'Address' } & AddressListPartsFragment;
        address?: Maybe<{ __typename?: 'Address' } & AddressListPartsFragment>;
    };

export type CustomerPriceListPartsFragment = { __typename?: 'CustomerPriceList' } & Pick<
    CustomerPriceList,
    'id' | 'displayName' | 'validFrom' | 'validTo'
> & {
        productPrices?: Maybe<
            Array<{ __typename?: 'CustomerProductPrice' } & CustomerProductPriceListPartsFragment>
        >;
    };

export type CustomerProductPriceListPartsFragment = { __typename?: 'CustomerProductPrice' } & Pick<
    CustomerProductPrice,
    'id' | 'sellingPrice'
> & {
        product: { __typename?: 'Product' } & ProductListPartsFragment;
        currency: { __typename?: 'Currency' } & CurrencyListPartsFragment;
    };

export type CustomerGroupsQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type CustomerGroupsQuery = { __typename?: 'Query' } & {
    customerGroups: Array<{ __typename?: 'CustomerGroup' } & CustomerGroupListPartsFragment>;
};

export type CustomersQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type CustomersQuery = { __typename?: 'Query' } & {
    customers: Array<{ __typename?: 'Customer' } & CustomerListPartsFragment>;
};

export type OrganizationListPartsFragment = { __typename?: 'Organization' } & Pick<
    Organization,
    'contact' | 'displayName' | 'id' | 'idNumber' | 'legalName' | 'registration' | 'vatNumber'
>;

export type OrganizationsQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type OrganizationsQuery = { __typename?: 'Query' } & {
    organizations: Array<{ __typename?: 'Organization' } & OrganizationListPartsFragment>;
};

export type ProductListPartsFragment = { __typename?: 'Product' } & Pick<
    Product,
    'id' | 'sku' | 'displayName'
>;

export type ProductsQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type ProductsQuery = { __typename?: 'Query' } & {
    products: Array<{ __typename?: 'Product' } & ProductListPartsFragment>;
};

export type SalesInvoiceListPartsFragment = { __typename?: 'SalesInvoice' } & Pick<
    SalesInvoice,
    'id' | 'documentNo' | 'grandTotalAccountingSchemeCurrency'
>;

export type SalesInvoicesQueryVariables = Exact<{
    dummy?: Maybe<Scalars['Int']>;
}>;

export type SalesInvoicesQuery = { __typename?: 'Query' } & {
    salesInvoices: Array<{ __typename?: 'SalesInvoice' } & SalesInvoiceListPartsFragment>;
};
