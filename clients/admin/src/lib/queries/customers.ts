import gql from 'graphql-tag';

export const MOCKED_CUSTOMER_DISPLAY_NAME = 'waa_customer';

export const CUSTOMERS = gql`
    {
        customers {
            id
            legalName
            displayName
            vatNumber
            invoicingEmail
            legalAddress {
                id
                city
                line1
                zipCode
                country {
                    id
                    isoCode
                }
            }
            address {
                id
                city
                line1
                zipCode
                country {
                    id
                    isoCode
                }
            }
            note
        }
    }
`;

export const mock = {
    data: {
        customers: [
            {
                id: 1,
                legalName: 'waaah ltd.',
                displayName: MOCKED_CUSTOMER_DISPLAY_NAME,
                vatNumber: 'HSASD',
                invoicingEmail: 'djdsjfids@saodk.com',
                legalAddress: {
                    id: 3,
                    city: 'New York',
                    line1: 'Street 1',
                    zipCode: 'ABCDE',
                    country: {
                        id: 2,
                        isoCode: 'CZ',
                    },
                },
                address: null,
                note: null,
            },
        ],
    },
};
