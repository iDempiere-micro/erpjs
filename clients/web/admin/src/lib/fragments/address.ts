import { COUNTRY_LIST_PARTS_RAW } from './country';

export const ADDRESS_LIST_PARTS_RAW = `
        id
        city
        line1
        zipCode
        country {
            ${COUNTRY_LIST_PARTS_RAW}
        }
`;
