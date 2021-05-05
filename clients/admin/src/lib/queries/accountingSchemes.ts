import gql from 'graphql-tag';
import { ACCOUNTING_SCHEME_DETAIL_PARTS_RAW } from '../fragments/accountingScheme';

export const ACCOUNTING_SCHEMES = gql`
    {
        accountingSchemes {
            ${ACCOUNTING_SCHEME_DETAIL_PARTS_RAW}
        }
    }
`;
export const mock = {
    data: {
        accountingSchemes: [
            {
                id: 1,
                displayName: 'Expert AccountingScheme',
                currency: {
                    id: 1,
                    isoCode: 'ABC',
                    displayName: 'ABC Currency',
                },
            },
            {
                id: 2,
                displayName: 'Software AccountingScheme',
                currency: {
                    id: 2,
                    isoCode: 'DEF',
                    displayName: 'Currency DEF',
                },
            },
        ],
    },
};
