import { BANK_LIST_PARTS_RAW } from './bank';

export const BANK_ACCOUNT_LIST_PARTS_RAW = `
        id
        displayName
        bank {
            ${BANK_LIST_PARTS_RAW}
        }
        bankAccountCustomerPrintableNumber
        iban
        swift
`;
