import gql from 'graphql-tag';
import { mock } from './factoringProviders';
import { FACTORING_PROVIDER_DETAIL_PARTS_RAW } from '../fragments/factoringProvider';

export const SAVE_FACTORING_PROVIDER = gql`
    mutation SaveFactoringProvider(
        $id: Int
        $displayName: String!
        $contact: String!
        $legalName: String!
        $newBankAccount: BankAccountSaveArgs!
    ) {
        saveFactoringProvider(
            args: {
                id: $id
                displayName: $displayName
                contact: $contact
                legalName: $legalName
                newBankAccount: $newBankAccount
            }
        ) {
            id
        }
    }
`;
export const GET_FACTORING_PROVIDER_BY_ID = gql`
    query factoringProviderById($id: Int!) {
        factoringProvider(id: $id) {
            ${FACTORING_PROVIDER_DETAIL_PARTS_RAW}
        }
    }
`;
export const mock1 = {
    data: {
        factoringProvider: {
            ...mock.data.factoringProviders[0],
        },
    },
};
