import type {
    ProductByIdQuery,
    ProductsQuery,
    SaveProductMutation,
    SaveProductMutationVariables,
} from '../../generated/graphql';
import { PRODUCTS } from '../queries/products';
import { GET_PRODUCT_BY_ID, SAVE_PRODUCT } from '../queries/product';
import type { ProductDetail, ProductRow } from '../model/product';
import { BaseEntityService } from './entityStore';
import type { DocumentNode } from '@apollo/client/core';

class ProductService extends BaseEntityService<
    ProductDetail,
    ProductRow,
    SaveProductMutationVariables,
    ProductByIdQuery,
    ProductsQuery,
    SaveProductMutation
> {
    protected convertDetail(q: ProductByIdQuery): ProductDetail {
        return q.product;
    }

    protected convertListItem(q: ProductsQuery): ProductRow[] {
        return q.products;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_PRODUCT_BY_ID;
    }

    getDetailSafeEntity(): ProductDetail {
        return { currency: {} } as any;
    }

    protected getListGql(): DocumentNode {
        return PRODUCTS;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_PRODUCT;
    }
}

export const productService: ProductService = new ProductService();
