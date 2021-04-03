<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditProduct from '../components/add-product/AddOrEditProduct.svelte';
    import { urls } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';

    const client = apollo(urls.products.add);
    setClient(client);
</script>

<Page title={$_('page.products.add.title')} segment={segments.products}>
    <span slot="content">
        <AddOrEditProduct {client} />
    </span>
</Page>

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
