import gql from 'graphql-tag';
import { BANK_DETAIL_PARTS } from '../fragments';

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
    ${BANK_DETAIL_PARTS}
    query bankById($id: Int!) {
        bank(id: $id) {
            ...BankDetailParts
        }
    }
`;
