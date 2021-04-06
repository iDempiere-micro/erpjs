import gql from 'graphql-tag';

export const PRODUCTS = gql`
    {
        countries {
            id
            displayName
        }
    }
`;
export const mock = {
    data: {
        countries: [
            {
                id: 1,
                displayName: 'ABC Country',
                isoCode: 'ABC',
            },
            {
                id: 2,
                displayName: 'DEF Country',
                isoCode: 'DEF',
            },
        ],
    },
};
