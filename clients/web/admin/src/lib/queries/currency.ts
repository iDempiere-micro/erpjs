import gql from 'graphql-tag';
import { CURRENCY_DETAIL_PARTS_RAW } from '../fragments';
import { mock } from './currencies';

export const SAVE_CURRENCY = gql`
    mutation SaveCurrency($id: Int, $displayName: String!, $isoCode: String!) {
        saveCurrency(args: { id: $id, displayName: $displayName, isoCode: $isoCode }) {
            id
        }
    }
`;
export const GET_CURRENCY_BY_ID = gql`
    query currencyById($id: Int!) {
        currency(id: $id) {
            ${CURRENCY_DETAIL_PARTS_RAW}
        }
    }
`;

export const mock1 = {
    data: {
        currency: mock.data.currencies[0],
    },
};
