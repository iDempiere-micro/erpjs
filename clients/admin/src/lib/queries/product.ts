import gql from 'graphql-tag';

export const SAVE_PRODUCT = gql`
    mutation SaveProduct($id: Int, $displayName: String!, $sku: String!) {
        saveProduct(args: { id: $id, displayName: $displayName, sku: $sku }) {
            id
        }
    }
`;
