import gql from 'graphql-tag';

export const PRODUCTS = gql`
    {
        products {
            id
            displayName
        }
    }
`;
export const mock = {
    data: {
        products: [
            {
                id: 1,
                displayName: 'Expert Work',
            },
            {
                id: 2,
                displayName: 'Software Leasing Service',
            },
        ],
    },
};
