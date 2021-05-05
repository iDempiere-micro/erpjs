import gql from 'graphql-tag';
import { mock as mockFactoringContracts } from './factoringContracts';
import { FACTORING_CONTRACT_DETAIL_PARTS_RAW } from '../fragments/factoringContract';

export const SAVE_FACTORING_CONTRACT = gql`
    mutation SaveFactoringContract(
        $id: Int
        $invoicePrintNote: String!
        $factoringProviderId: Int!
        $customerId: Int!
        $organizationId: Int!
    ) {
        saveFactoringContract(
            args: {
                id: $id
                invoicePrintNote: $invoicePrintNote
                factoringProviderId: $factoringProviderId
                customerId: $customerId
                organizationId: $organizationId
            }
        ) {
            id
        }
    }
`;

export const mock = {
    data: {
        saveFactoringContract: {
            id: 999,
        },
    },
};

export const GET_FACTORING_CONTRACT_BY_ID = gql`
    query factoringContractById($id: Int!) {
        factoringContract(id: $id) {
            ${FACTORING_CONTRACT_DETAIL_PARTS_RAW}
        }
    }
`;

export const mock1 = {
    data: {
        factoringContract: mockFactoringContracts.data.factoringContracts[0],
    },
};
