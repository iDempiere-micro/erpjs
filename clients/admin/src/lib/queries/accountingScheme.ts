import gql from 'graphql-tag';
import { ACCOUNTING_SCHEME_DETAIL_PARTS_RAW } from '../fragments';
import { mock as mockCurrencies } from './currencies';

export const SAVE_ACCOUNTING_SCHEME = gql`
    mutation SaveAccountingScheme($id: Int, $displayName: String!, $currencyIsoCode: String!) {
        saveAccountingScheme(
            args: { id: $id, displayName: $displayName, currencyIsoCode: $currencyIsoCode }
        ) {
            id
        }
    }
`;

export const mock = {
    data: {
        saveAccountingScheme: {
            id: 999,
        },
    },
};

export const GET_ACCOUNTING_SCHEME_BY_ID = gql`
    query accountingSchemeById($id: Int!) {
        accountingScheme(id: $id) {
            ${ACCOUNTING_SCHEME_DETAIL_PARTS_RAW}
        }
    }
`;

export const mock1 = {
    data: {
        accountingScheme: {
            id: 999,
            displayName: 'TestDisplayName123',
            currency: mockCurrencies.data.currencies[0],
        },
    },
};
