import gql from 'graphql-tag';

export const COUNTRIES = gql`
    {
        countries {
            id
            displayName
            isoCode
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
