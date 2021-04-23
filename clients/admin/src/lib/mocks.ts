import type { DocumentNode } from '@apollo/client/core';
import type { RequestHandler } from 'mock-apollo-client/dist/mockClient';
import { CUSTOMERS, mock as mockCustomers } from './queries/customers';
import { GET_MENU, mock as mockMenu } from './queries/menu';
import { EVERYTHING, mock as mockSalesInvoices } from './queries/salesInvoices';
import {
    QUERY as SALES_INVOICES_IN_TIME,
    mock as mockSalesInvoicesInTime,
} from './queries/salesInvoicesInTime';
import { PRODUCTS, mock as mockProducts } from './queries/products';
import { CURRENCIES, mock as mockCurrencies } from './queries/currencies';
import {
    SAVE_ACCOUNTING_SCHEME,
    mock as mockSaveAccountingScheme,
    mock1 as mockGetAccountingSchemeById,
    GET_ACCOUNTING_SCHEME_BY_ID,
} from './queries/accountingScheme';
import { ACCOUNTING_SCHEMES, mock as mockAccountingSchemes } from './queries/accountingSchemes';
import { CUSTOMER_GROUPS, mock as mockCustomerGroups } from './queries/customerGroups';
import {
    GET_CUSTOMER_GROUP_BY_ID,
    mock1 as mockCustomerGroup,
    SAVE_CUSTOMER_GROUP,
    mock as mockSaveCustomerGroup,
} from './queries/customerGroup';
import { GET_CUSTOMER_BY_ID, mock as mockGetCustomerById } from './queries/customer';
import { GET_SALES_INVOICE_BY_ID } from './queries/salesInvoice';

export interface ApolloMock {
    query: DocumentNode;
    handler: RequestHandler;
}

export const mocks: ApolloMock[] = [
    { query: CUSTOMERS, mock: mockCustomers },
    { query: GET_MENU, mock: mockMenu },
    { query: SALES_INVOICES_IN_TIME, mock: mockSalesInvoicesInTime },
    { query: EVERYTHING, mock: mockSalesInvoices },
    { query: PRODUCTS, mock: mockProducts },
    { query: CURRENCIES, mock: mockCurrencies },
    { query: SAVE_ACCOUNTING_SCHEME, mock: mockSaveAccountingScheme },
    { query: GET_ACCOUNTING_SCHEME_BY_ID, mock: mockGetAccountingSchemeById },
    { query: ACCOUNTING_SCHEMES, mock: mockAccountingSchemes },
    { query: CUSTOMER_GROUPS, mock: mockCustomerGroups },
    { query: GET_CUSTOMER_GROUP_BY_ID, mock: mockCustomerGroup },
    { query: SAVE_CUSTOMER_GROUP, mock: mockSaveCustomerGroup },
    { query: GET_CUSTOMER_BY_ID, mock: mockGetCustomerById },
    { query: GET_SALES_INVOICE_BY_ID, mock: {} as any }
].map(({ query, mock }) => ({ query, handler: () => Promise.resolve(mock) }));
