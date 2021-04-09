import gql from 'graphql-tag';

export const SAVE_BANK = gql`
    mutation SaveBank($id: Int, $displayName: String!, $bankIdentifierCode: String!) {
        saveBank(
            args: { id: $id, displayName: $displayName, bankIdentifierCode: $bankIdentifierCode }
        ) {
            id
        }
    }
`;
