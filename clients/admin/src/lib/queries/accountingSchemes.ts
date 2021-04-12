import gql from 'graphql-tag';

export const ACCOUNTING_SCHEMES = gql`
    {
        accountingSchemes {
            id
            displayName
            currency {
                isoCode
            }
        }
    }
`;
export const mock = {
    data: {
        accountingSchemes: [
            {
                id: 1,
                displayName: 'Expert AccountingScheme',
                currency: { isoCode: 'ABC' },
            },
            {
                id: 2,
                displayName: 'Software AccountingScheme',
                currency: { isoCode: 'DEF' },
            },
        ],
    },
};
