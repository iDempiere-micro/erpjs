import type { DocumentNode } from '@apollo/client/core';
import type { RequestHandler } from 'mock-apollo-client/dist/mockClient';
import {
    mock as mockSalesInvoicesInTime,
    QUERY as SALES_INVOICES_IN_TIME,
} from '../queries/salesInvoicesInTime';

export interface ApolloMock {
    query: DocumentNode;
    handler: RequestHandler;
}

export const mocks: ApolloMock[] = [
    { query: SALES_INVOICES_IN_TIME, mock: mockSalesInvoicesInTime },
].map(({ query, mock }) => ({ query, handler: () => Promise.resolve(mock) }));
