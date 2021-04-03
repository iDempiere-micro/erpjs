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
].map(({ query, mock }) => ({ query, handler: () => Promise.resolve(mock) }));
