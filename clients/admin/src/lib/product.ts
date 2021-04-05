import gql from 'graphql-tag';
import type {
    ProductByIdQuery,
    ProductListPartsFragment,
    ProductsQuery,
} from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import { PRODUCT_DETAIL_PARTS, UNIT_OF_MEASUREMENT_DETAIL_PARTS } from './fragments';
import { PRODUCTS } from './queries/products';
import type { SelectItem } from './select';

export interface WithProductListPartsFragment {
    loaded: boolean;
    products: ProductListPartsFragment[];
}

export const productsStore = store<WithProductListPartsFragment>({
    loaded: false,
    products: [],
});
export const ensureProductsStore = () => {
    if (productsStore.get().loaded) return;

    const productsResult = query<ProductsQuery>(PRODUCTS);
    productsResult.subscribe((value) => {
        if (value?.data) {
            productsStore.update((x) => ({
                loaded: true,
                // @ts-ignore
                products: value.data.products,
            }));
        }
    });
};

export const mapProducts = (data: ProductListPartsFragment[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];

const GET_PRODUCT_BY_ID = gql`
    ${UNIT_OF_MEASUREMENT_DETAIL_PARTS}
    ${PRODUCT_DETAIL_PARTS}
    query productById($id: Int!) {
        product(id: $id) {
            ...ProductDetailParts
        }
    }
`;

export const getProductBy = (id: number) =>
    query<ProductByIdQuery>(GET_PRODUCT_BY_ID, { variables: { id } });
