<script lang="ts">
    import { productService } from '../lib/core';
    import { push, segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import Button from '../dsl/Button.svelte';
    import ProductDetail from '../components/product-detail/ProductDetail.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    productService.load(id);
    const store = productService.stores.detail;

    const editProduct = () => push(urls.products.edit, id);
</script>

<Page
    segment={segments.products}
    name="page.product.detail"
    title={$_('page.products.detail.title')}
>
    <span slot="content">
        {#if $store.loaded}
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.products.detail.info')}
                    </h3>
                </div>
                <ProductDetail product={$store.data} />
                <div class="px-4 py-3 bg-white text-right sm:px-6">
                    <Button
                        label={$_('actions.edit')}
                        on:click={() => {
                            editProduct();
                        }}
                    />
                </div>
            </div>
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
