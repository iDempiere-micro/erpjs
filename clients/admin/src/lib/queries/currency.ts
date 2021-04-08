import gql from 'graphql-tag';

export const SAVE_CURRENCY = gql`
    mutation SaveCurrency($id: Int, $displayName: String!, $isoCode: String!) {
        saveCurrency(args: { id: $id, displayName: $displayName, isoCode: $isoCode }) {
            id
        }
    }
`;
