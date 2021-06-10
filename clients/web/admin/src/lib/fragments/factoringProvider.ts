import { BANK_ACCOUNT_LIST_PARTS_RAW } from './bankAccount';

export const FACTORING_PROVIDER_LIST_PARTS_RAW = `
        id
        displayName
        legalName
        contact
`;
export const FACTORING_PROVIDER_DETAIL_PARTS_RAW = `
        id
        displayName
        legalName
        contact
        bankAccount {
            ${BANK_ACCOUNT_LIST_PARTS_RAW}
        }  
`;
