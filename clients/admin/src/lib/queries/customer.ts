import gql from 'graphql-tag';
import {
    ADDRESS_LIST_PARTS,
    COUNTRY_LIST_PARTS,
    CUSTOMER_DETAIL_PARTS,
    CUSTOMER_GROUP_DETAIL_PARTS,
    CUSTOMER_GROUP_LIST_PARTS,
} from '../fragments';

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
    ${CUSTOMER_DETAIL_PARTS}
    query CustomerById($id: Int!) {
        customer(id: $id) {
            ...CustomerDetailParts
        }
    }
`;
export const ADD_CUSTOMER = gql`
    mutation CreateCustomer(
        $id: Int
        $displayName: String!
        $legalName: String!
        $legalAddressCity: String!
        $note: String
        $idNumber: String!
        $legalAddressCountryIsoCode: String!
        $legalAddressLine1: String!
        $legalAddressZipCode: String!
        $invoicingEmail: String!
        $vatNumber: String!
    ) {
        createCustomer(
            args: {
                id: $id
                displayName: $displayName
                legalName: $legalName
                invoicingEmail: $invoicingEmail
                idNumber: $idNumber
                legalAddress: {
                    city: $legalAddressCity
                    countryIsoCode: $legalAddressCountryIsoCode
                    line1: $legalAddressLine1
                    zipCode: $legalAddressZipCode
                }
                note: $note
                vatNumber: $vatNumber
            }
        ) {
            id
        }
    }
`;
