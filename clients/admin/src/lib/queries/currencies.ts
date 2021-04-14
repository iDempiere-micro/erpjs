import gql from 'graphql-tag';

export const CURRENCIES = gql`
    {
        currencies {
            id
            isoCode
            displayName
        }
    }
`;
export const mock = {
    data: {
        currencies: [
            {
                id: 1,
                displayName: 'ABC',
                isoCode: 'ABC',
            },
            {
                id: 2,
                displayName: 'DEF',
                isoCode: 'DEF',
            },
        ],
    },
};
