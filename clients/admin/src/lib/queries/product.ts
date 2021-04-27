import gql from 'graphql-tag';
import { PRODUCT_DETAIL_PARTS, UNIT_OF_MEASUREMENT_DETAIL_PARTS } from '../fragments';

export const SAVE_PRODUCT = gql`
    mutation SaveProduct($id: Int, $displayName: String!, $sku: String!) {
        saveProduct(args: { id: $id, displayName: $displayName, sku: $sku }) {
            id
        }
    }
`;
export const GET_PRODUCT_BY_ID = gql`
    ${UNIT_OF_MEASUREMENT_DETAIL_PARTS}
    ${PRODUCT_DETAIL_PARTS}
    query productById($id: Int!) {
        product(id: $id) {
            ...ProductDetailParts
        }
    }
`;
