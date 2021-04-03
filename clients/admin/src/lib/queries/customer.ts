import gql from 'graphql-tag';

export const mock = {
    data: {
        customer: {
            id: 1,
            legalName: 'eValue.cz s.r.o.',
            displayName: 'evalue',
            vatNumber: 'CZ03841812',
            invoicingEmail: 'lukas.tomasek@evalue.cz',
            legalAddress: {
                id: 3,
                city: 'Praha 3 Žižkov',
                line1: 'Jičínská 1616/29',
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
