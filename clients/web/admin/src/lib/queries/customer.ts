import gql from 'graphql-tag';
import { CUSTOMER_DETAIL_PARTS_RAW } from '../fragments';

export const mock = {
    data: {
        customer: {
            id: 1,
            legalName: 'ABC s.r.o.',
            displayName: 'abc',
            vatNumber: 'CZ012345678',
            idNumber: '12345678',
            invoicingEmail: 'a.b@abc.com',
            legalAddress: {
                id: 3,
                city: 'Praha 3 Žižkov',
                line1: 'Street 11',
                zipCode: '13000',
                country: {
                    id: 2,
                    isoCode: 'CZ',
                },
            },
            address: null,
            note: null,
        },
    },
};

export const GET_CUSTOMER_BY_ID = gql`
    query CustomerById($id: Int!) {
        customer(id: $id) {
            ${CUSTOMER_DETAIL_PARTS_RAW}
        }
    }
`;
export const SAVE_CUSTOMER = gql`
    mutation SaveCustomer(
        $id: Int
        $displayName: String!
        $legalName: String!
        $legalAddressCity: String!
        $note: String
        $idNumber: String!
        $legalAddressCountryId: Int!
        $legalAddressLine1: String!
        $legalAddressZipCode: String!
        $invoicingEmail: String!
        $vatNumber: String
        $customerGroupId: Int
    ) {
        saveCustomer(
            args: {
                id: $id
                displayName: $displayName
                legalName: $legalName
                invoicingEmail: $invoicingEmail
                idNumber: $idNumber
                legalAddress: {
                    city: $legalAddressCity
                    countryId: $legalAddressCountryId
                    line1: $legalAddressLine1
                    zipCode: $legalAddressZipCode
                }
                note: $note
                vatNumber: $vatNumber
                customerGroupId: $customerGroupId
            }
        ) {
            id
        }
    }
`;
