import { CURRENCY_DETAIL_PARTS_RAW } from './currency';

export const ACCOUNTING_SCHEME_DETAIL_PARTS_RAW = `
    id
    displayName
    currency {
        ${CURRENCY_DETAIL_PARTS_RAW}
    }
`;
