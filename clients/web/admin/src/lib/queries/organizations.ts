import gql from 'graphql-tag';
import { mock as mockCountries } from './countries';
import { mock as mockBanks } from './banks';
import { ADDRESS_LIST_PARTS_RAW } from '../fragments/address';
import { BANK_ACCOUNT_LIST_PARTS_RAW } from '../fragments/bankAccount';

export const ORGANIZATIONS = gql`
    {
        organizations {
            id
            displayName
            legalAddress {
                ${ADDRESS_LIST_PARTS_RAW}
            }
            legalName
            registration
            contact
            idNumber
            vatNumber
            bankAccount {
                ${BANK_ACCOUNT_LIST_PARTS_RAW}
            }
        }
    }
`;
export const mock = {
    data: {
        organizations: [
            {
                id: 1,
                displayName: 'OO',
                legalAddress: {
                    id: 1,
                    city: 'Aosdjasdp',
                    line1: 'Aomdasdm',
                    zipCode: 'AAA123',
                    country: mockCountries.data.countries[0],
                },
                legalName: 'Our org ltd.',
                registration: 'Registered in England',
                contact: 'aaa@bbb.com',
                idNumber: '150483782',
                bankAccount: {
                    id: 1,
                    displayName: 'Main BA',
                    bank: mockBanks.data.banks[0],
                    bankAccountCustomerPrintableNumber: 'ADSA SOADK/909-W23',
                    iban: 'ASHASOD',
                    swift: 'ODSAO',
                },
            },
            {
                id: 2,
                displayName: 'TO',
                legalAddress: {
                    id: 1,
                    city: 'Gdgdf',
                    line1: 'Kdssfdpds',
                    zipCode: '876KKL',
                    country: mockCountries.data.countries[1],
                },
                legalName: 'Other org ltd.',
                registration: 'Registered in Scotland',
                contact: 'uuu@xzy.com',
                idNumber: '987689',
                vatNumber: 'UK87667',
                bankAccount: {
                    id: 2,
                    displayName: 'DASAJD',
                    bank: mockBanks.data.banks[1],
                    bankAccountCustomerPrintableNumber: '8S7AD8-878',
                    iban: 'UAIDADADS',
                    swift: 'VSAGSH',
                },
            },
        ],
    },
};
export const ORGANIZATIONS_SIMPLE = gql`
    {
        organizations {
            id
            displayName
        }
    }
`;
