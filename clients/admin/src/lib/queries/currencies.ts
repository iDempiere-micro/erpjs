import gql from 'graphql-tag';

export const CURRENCIES = gql`
    {
        currencies {
            id
            displayName
            isoCode
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
