import gql from 'graphql-tag';
import { ORGANIZATION_DETAIL_PARTS_RAW } from '../fragments/organization';
import { mock as mockOrganizations } from './organizations';

export const SAVE_ORGANIZATION = gql`
    mutation SaveOrganization(
        $id: Int
        $displayName: String!
        $contact: String!
        $legalName: String!
        $registration: String!
        $idNumber: String!
        $vatNumber: String
        $accountingSchemeId: Int!
        $currentInvoiceDocumentNumber: Float!
        $newBankAccount: BankAccountSaveArgs!
        $legalAddress: AddressSaveArgs!
    ) {
        saveOrganization(
            args: {
                id: $id
                displayName: $displayName
                contact: $contact
                legalName: $legalName
                registration: $registration
                idNumber: $idNumber
                vatNumber: $vatNumber
                accountingSchemeId: $accountingSchemeId
                currentInvoiceDocumentNumber: $currentInvoiceDocumentNumber
                newBankAccount: $newBankAccount
                legalAddress: $legalAddress
            }
        ) {
            id
        }
    }
`;
export const GET_ORGANIZATION_BY_ID = gql`
    query organizationById($id: Int!) {
        organization(id: $id) {
            ${ORGANIZATION_DETAIL_PARTS_RAW}
        }
    }
`;

export const mock = {
    data: {
        organization: mockOrganizations.data.organizations[0],
    },
};
