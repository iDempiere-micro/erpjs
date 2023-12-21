import gql from 'graphql-tag';

export const PRODUCTS = gql`
    {
        products {
            id
            displayName
            sku
        }
    }
`;
export const mock = {
    data: {
        products: [
            {
                id: 1,
                displayName: 'Expert Work',
                sku: 'EX',
            },
            {
                id: 2,
                displayName: 'Software Leasing Service',
                sku: 'SLS',
            },
        ],
    },
};
