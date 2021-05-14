<script lang="ts">
    import { productService } from '../lib/core/product';
    import AddOrEditProduct from '../components/add-product/AddOrEditProduct.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);
    productService.load(id);

    const product = productService.stores.detail;
</script>

<Page title={$_('page.products.edit.title')} segment={segments.products} name="page.products.edit">
    <span slot="content">
        {#if $product.loaded}
            <AddOrEditProduct product={$product.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
