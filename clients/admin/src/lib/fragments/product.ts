import { CURRENCY_LIST_PARTS_RAW } from './currency';
import { UNIT_OF_MEASUREMENT_LIST_PARTS_RAW } from './uom';

export const PRODUCT_LIST_PARTS_RAW = `
    id
    sku
    displayName
`;
export const PRODUCT_PRICES_LIST_PARTS_RAW = `
    id
    sellingPrice
    product {
        ${PRODUCT_LIST_PARTS_RAW}
    }
    currency {
        ${CURRENCY_LIST_PARTS_RAW}
    }
`;

export const PRODUCT_DETAIL_PARTS_RAW = `
    id
    displayName
    sku
    defaultUoM {
        ${UNIT_OF_MEASUREMENT_LIST_PARTS_RAW}
    }

`;
