<script lang="ts">
    import type { ProductsQuery } from '../generated/graphql';
    import { getError } from '../lib/support/util';
    import ProductList from '../components/products/ProductList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { PRODUCTS } from '../lib/queries/products';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { query } from '../absorb/svelte-apollo';

    const products = query<ProductsQuery, any>(PRODUCTS);
</script>

<Page title={$_('page.products.title')} segment={segments.products} name="page.products">
    <span slot="content">
        {#if $products.loading}
            {$_('status.loading')}
        {:else if $products.error}
            {$_('status.error')} {getError($products.error)}
        {:else}
            <ProductList products={$products.data?.products} />
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.products.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.products.add.title')}</a
        >
    </span>
</Page>
