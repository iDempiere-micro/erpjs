import gql from 'graphql-tag';

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
