import gql from 'graphql-tag';
import { CURRENCY_DETAIL_PARTS } from '../fragments';

export const SAVE_CURRENCY = gql`
    mutation SaveCurrency($id: Int, $displayName: String!, $isoCode: String!) {
        saveCurrency(args: { id: $id, displayName: $displayName, isoCode: $isoCode }) {
            id
        }
    }
`;
export const GET_CURRENCY_BY_ID = gql`
    ${CURRENCY_DETAIL_PARTS}
    query currencyById($id: Int!) {
        currency(id: $id) {
            ...CurrencyDetailParts
        }
    }
`;
