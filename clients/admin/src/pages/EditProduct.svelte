<script lang="ts">
    import { getProductBy } from '../lib/core/product';
    import AddOrEditProduct from '../components/add-product/AddOrEditProduct.svelte';
    import { segments } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const product = getProductBy(id);
</script>

<Page title={$_('page.products.edit.title')} segment={segments.products} name="page.products.edit">
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
