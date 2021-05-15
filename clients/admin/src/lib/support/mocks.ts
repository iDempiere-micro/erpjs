import type { DocumentNode } from '@apollo/client/core';
import type { RequestHandler } from 'mock-apollo-client/dist/mockClient';
import {
    CUSTOMERS,
    GET_CUSTOMERS_BY_ARGS,
    mock as mockCustomers,
    mock2 as mockCustomersByArgs,
} from '../queries/customers';
import { GET_MENU, mock as mockMenu } from '../queries/menu';
import { mock as mockSalesInvoices, SALES_INVOICES } from '../queries/salesInvoices';
import {
    mock as mockSalesInvoicesInTime,
    QUERY as SALES_INVOICES_IN_TIME,
} from '../queries/salesInvoicesInTime';
import { mock as mockProducts, PRODUCTS } from '../queries/products';
import { CURRENCIES, mock as mockCurrencies } from '../queries/currencies';
import {
    GET_ACCOUNTING_SCHEME_BY_ID,
    mock as mockSaveAccountingScheme,
    mock1 as mockGetAccountingSchemeById,
    SAVE_ACCOUNTING_SCHEME,
} from '../queries/accountingScheme';
import { ACCOUNTING_SCHEMES, mock as mockAccountingSchemes } from '../queries/accountingSchemes';
import { CUSTOMER_GROUPS, mock as mockCustomerGroups } from '../queries/customerGroups';
import {
    GET_CUSTOMER_GROUP_BY_ID,
    mock as mockSaveCustomerGroup,
    mock1 as mockCustomerGroup,
    SAVE_CUSTOMER_GROUP,
} from '../queries/customerGroup';
import { GET_CUSTOMER_BY_ID, mock as mockGetCustomerById } from '../queries/customer';
import { GET_SALES_INVOICE_BY_ID, mock1 as mockGetSalesInvoiceById } from '../queries/salesInvoice';
import { FACTORING_PROVIDERS, mock as mockFactoringProviders } from '../queries/factoringProviders';
import {
    GET_FACTORING_PROVIDER_BY_ID,
    mock1 as mockFactoringProvider,
} from '../queries/factoringProvider';
import { FACTORING_CONTRACTS, mock as mockFactoringContracts } from '../queries/factoringContracts';
import {
    GET_FACTORING_CONTRACT_BY_ID,
    mock1 as mockFactoringContract,
} from '../queries/factoringContract';
import { COUNTRIES, mock as mockCountries } from '../queries/countries';
import { BANKS, mock as mockBanks } from '../queries/banks';
import {
    mock as mockOrganizations,
    ORGANIZATIONS,
    ORGANIZATIONS_SIMPLE,
} from '../queries/organizations';
import { GET_BANK_BY_ID, mock1 as mockBank } from '../queries/bank';
import { GET_COUNTRY_BY_ID, mock1 as mockCountryById } from '../queries/country';
import { GET_CURRENCY_BY_ID, mock1 as mockCurrencyById } from '../queries/currency';
import { GET_ORGANIZATION_BY_ID, mock as mockOrganization } from '../queries/organization';
import { GET_PRODUCT_BY_ID, mock1 as mockProduct } from '../queries/product';
import { ATTACHMENTS, mock as mockAttachments } from '../queries/attachments';
import { GET_ATTACHMENT_BY_ID, mock1 as mockAttachment } from '../queries/attachment';

export interface ApolloMock {
    query: DocumentNode;
    handler: RequestHandler;
}

export const mocks: ApolloMock[] = [
    { query: CUSTOMERS, mock: mockCustomers },
    { query: GET_MENU, mock: mockMenu },
    { query: SALES_INVOICES_IN_TIME, mock: mockSalesInvoicesInTime },
    { query: SALES_INVOICES, mock: mockSalesInvoices },
    { query: PRODUCTS, mock: mockProducts },
    { query: CURRENCIES, mock: mockCurrencies },
    { query: SAVE_ACCOUNTING_SCHEME, mock: mockSaveAccountingScheme },
    { query: GET_ACCOUNTING_SCHEME_BY_ID, mock: mockGetAccountingSchemeById },
    { query: ACCOUNTING_SCHEMES, mock: mockAccountingSchemes },
    { query: CUSTOMER_GROUPS, mock: mockCustomerGroups },
    { query: GET_CUSTOMER_GROUP_BY_ID, mock: mockCustomerGroup },
    { query: SAVE_CUSTOMER_GROUP, mock: mockSaveCustomerGroup },
    { query: GET_CUSTOMER_BY_ID, mock: mockGetCustomerById },
    { query: GET_SALES_INVOICE_BY_ID, mock: mockGetSalesInvoiceById },
    { query: FACTORING_PROVIDERS, mock: mockFactoringProviders },
    { query: GET_FACTORING_PROVIDER_BY_ID, mock: mockFactoringProvider },
    { query: FACTORING_CONTRACTS, mock: mockFactoringContracts },
    { query: GET_FACTORING_CONTRACT_BY_ID, mock: mockFactoringContract },
    { query: COUNTRIES, mock: mockCountries },
    { query: BANKS, mock: mockBanks },
    { query: ORGANIZATIONS, mock: mockOrganizations },
    { query: ORGANIZATIONS_SIMPLE, mock: mockOrganizations },
    { query: GET_BANK_BY_ID, mock: mockBank },
    { query: GET_CUSTOMERS_BY_ARGS, mock: mockCustomersByArgs },
    { query: GET_COUNTRY_BY_ID, mock: mockCountryById },
    { query: GET_CURRENCY_BY_ID, mock: mockCurrencyById },
    { query: GET_ORGANIZATION_BY_ID, mock: mockOrganization },
    { query: GET_PRODUCT_BY_ID, mock: mockProduct },
    { query: ATTACHMENTS, mock: mockAttachments },
    { query: GET_ATTACHMENT_BY_ID, mock: mockAttachment },
].map(({ query, mock }) => ({ query, handler: () => Promise.resolve(mock) }));
