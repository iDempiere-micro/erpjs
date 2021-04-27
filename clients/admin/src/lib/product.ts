import type {
    ProductByIdQuery,
    ProductListPartsFragment,
    ProductsQuery,
} from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import { PRODUCTS } from './queries/products';
import type { SelectItem } from './select';
import { GET_PRODUCT_BY_ID } from './queries/product';

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

export const getProductBy = (id: number) =>
    query<ProductByIdQuery>(GET_PRODUCT_BY_ID, { variables: { id } });
