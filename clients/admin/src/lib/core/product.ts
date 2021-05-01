import type {
    ProductByIdQuery,
    ProductListPartsFragment,
    ProductsQuery,
} from '../../generated/graphql';

import { store } from '../support/store';
import { PRODUCTS } from '../queries/products';
import type { SelectItem } from '../support/select';
import { GET_PRODUCT_BY_ID } from '../queries/product';
import { query } from '../../absorb/svelte-apollo';

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
        if (value?.error) throw new Error(`${value?.error}`);
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

export const getProductBy = (id: number) =>
    query<ProductByIdQuery>(GET_PRODUCT_BY_ID, { variables: { id } });
