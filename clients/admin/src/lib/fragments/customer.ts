import { ADDRESS_LIST_PARTS_RAW } from './address';
import { CUSTOMER_PRICE_LIST_PARTS_RAW } from './customerPriceList';

export const CUSTOMER_GROUP_LIST_PARTS_RAW = `
    id
    displayName
`;

export const CUSTOMER_LIST_PARTS_RAW = `
        id
        legalName
        displayName
        vatNumber
        invoicingEmail
        legalAddress {
            ${ADDRESS_LIST_PARTS_RAW}
        }
        address {
            ${ADDRESS_LIST_PARTS_RAW}
        }
        note
`;

export const CUSTOMER_GROUP_DETAIL_PARTS_RAW = `
    id
    displayName
    customers {
        ${CUSTOMER_LIST_PARTS_RAW}
    }
    customerPriceLists {
        ${CUSTOMER_PRICE_LIST_PARTS_RAW}
    }
`;
export const CUSTOMER_DETAIL_PARTS_RAW = `    
        id
        legalName
        displayName
        vatNumber
        idNumber
        invoicingEmail
        legalAddress {
            ${ADDRESS_LIST_PARTS_RAW}
        }
        address {
            ${ADDRESS_LIST_PARTS_RAW}
        }
        note
        customerGroup {
            ${CUSTOMER_GROUP_DETAIL_PARTS_RAW}
        }        
        www
        publicNote        
`;
