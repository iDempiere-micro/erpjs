<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { getProductBy } from '../lib/product';
    import AddOrEditProduct from '../components/add-product/AddOrEditProduct.svelte';
    import { urls } from './pathAndSegment';
    import { getError } from '../lib/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.products.edit + +id);
    setClient(client);

    const product = getProductBy(id);
</script>

<Page title={$_('page.products.edit.title')} segment={segments.products}>
    <span slot="content">
        {#if $product.loading}
            {$_('status.loading')}
        {:else if $product.error}
            {$_('status.error')} {getError($product.error)}
        {:else if $product?.data?.product}
            <AddOrEditProduct product={$product?.data?.product} />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
