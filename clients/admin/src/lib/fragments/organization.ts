import { ADDRESS_LIST_PARTS_RAW } from './address';
import { ACCOUNTING_SCHEME_DETAIL_PARTS_RAW } from './accountingScheme';
import { BANK_ACCOUNT_LIST_PARTS_RAW } from './bankAccount';

export const ORGANIZATION_LIST_PARTS_RAW = `
        contact
        displayName
        id
        idNumber
        legalName
        registration
        vatNumber
    `;
export const ORGANIZATION_DETAIL_PARTS_RAW = `
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
        accountingScheme {
            ${ACCOUNTING_SCHEME_DETAIL_PARTS_RAW}
        }
`;
