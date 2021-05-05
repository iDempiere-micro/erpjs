import { PRODUCT_PRICES_LIST_PARTS_RAW } from './product';

export const CUSTOMER_PRICE_LIST_PARTS_RAW = `
    id
    displayName
    validFrom
    validTo
    productPrices {
        ${PRODUCT_PRICES_LIST_PARTS_RAW}
    }    
`;
