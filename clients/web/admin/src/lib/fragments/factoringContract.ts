import { CUSTOMER_LIST_PARTS_RAW } from './customer';
import { FACTORING_PROVIDER_DETAIL_PARTS_RAW } from './factoringProvider';
import { ORGANIZATION_LIST_PARTS_RAW } from './organization';

export const FACTORING_CONTRACT_DETAIL_PARTS_RAW = `
    id
    customer {
        ${CUSTOMER_LIST_PARTS_RAW}
    }
    organization {
        ${ORGANIZATION_LIST_PARTS_RAW}
    }
    factoringProvider {
        ${FACTORING_PROVIDER_DETAIL_PARTS_RAW}
    }
    invoicePrintNote
`;
