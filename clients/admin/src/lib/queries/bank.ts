import gql from 'graphql-tag';
import { BANK_DETAIL_PARTS_RAW } from '../fragments';
import { mock } from './banks';

export const SAVE_BANK = gql`
    mutation SaveBank($id: Int, $displayName: String!, $bankIdentifierCode: String!) {
        saveBank(
            args: { id: $id, displayName: $displayName, bankIdentifierCode: $bankIdentifierCode }
        ) {
            id
        }
    }
`;
export const GET_BANK_BY_ID = gql`
    query bankById($id: Int!) {
        bank(id: $id) {
            ${BANK_DETAIL_PARTS_RAW}
        }
    }
`;

export const mock1 = {
    data: {
        bank: mock.data.banks[0],
    },
};
