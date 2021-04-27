import gql from 'graphql-tag';
import { ADDRESS_LIST_PARTS, BANK_ACCOUNT_LIST_PARTS } from '../fragments';

export const ORGANIZATIONS = gql`
    ${ADDRESS_LIST_PARTS}
    ${BANK_ACCOUNT_LIST_PARTS}
    {
        organizations {
            id
            displayName
            legalAddress {
                ...AddressListParts
            }
            legalName
            registration
            contact
            idNumber
            vatNumber
            bankAccount {
                ...BankAccountListParts
            }
        }
    }
`;
export const mock = {
    data: {
        organizations: [
            {
                id: 1,
                displayName: 'Our org ltd.',
            },
            {
                id: 2,
                displayName: 'Other org llc',
            },
        ],
    },
};
export const ORGANIZATIONS_SIMPLE = gql`
    {
        organizations {
            displayName
        }
    }
`;
