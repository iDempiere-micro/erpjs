import gql from 'graphql-tag';
import { PRODUCT_DETAIL_PARTS_RAW } from '../fragments';
import { mock } from './products';

export const SAVE_PRODUCT = gql`
    mutation SaveProduct($id: Int, $displayName: String!, $sku: String!) {
        saveProduct(args: { id: $id, displayName: $displayName, sku: $sku }) {
            id
        }
    }
`;
export const GET_PRODUCT_BY_ID = gql`
    query productById($id: Int!) {
        product(id: $id) {
            ${PRODUCT_DETAIL_PARTS_RAW}
        }
    }
`;

export const mock1 = {
    data: {
        product: mock.data.products[0],
    },
};
