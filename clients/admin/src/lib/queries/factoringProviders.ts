import gql from 'graphql-tag';
import { BANK_ACCOUNT_LIST_PARTS_RAW } from '../fragments/bankAccount';

export const FACTORING_PROVIDERS = gql`
    {
        factoringProviders {
            id
            displayName
            legalName
            contact
            bankAccount {
                ${BANK_ACCOUNT_LIST_PARTS_RAW}
            }
        }
    }
`;

export const mock = {
    data: {
        factoringProviders: [
            {
                id: 1,
                displayName: 'F1',
                legalName: 'F1 ltd.',
                contact: 'aa@nbb.com',
                bankAccount: {
                    id: 1,
                    displayName: 'aaa',
                    bank: {
                        id: 1,
                        displayName: 'B',
                        bankIdentifierCode: 'B',
                    },
                    bankAccountCustomerPrintableNumber: '123456',
                    iban: 'bbbb',
                    swift: 'VVVVV',
                },
            },
            {
                id: 2,
                displayName: 'F2',
                legalName: 'F2 llc',
                contact: 'aa@nbb.com',
                bankAccount: {
                    id: 1,
                    displayName: 'aaa',
                    bank: {
                        id: 1,
                        displayName: 'B',
                        bankIdentifierCode: 'B',
                    },
                    bankAccountCustomerPrintableNumber: '987654',
                    iban: 'bbbb',
                    swift: 'VVVVV',
                },
            },
        ],
    },
};
