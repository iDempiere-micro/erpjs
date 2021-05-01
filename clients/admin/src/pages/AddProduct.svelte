<script lang="ts">
    import AddOrEditProduct from '../components/add-product/AddOrEditProduct.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
</script>

<Page
    title={$_('page.products.add.title')}
    segment={segments.products}
    name="page.products.add.title"
>
    <span slot="content">
        <AddOrEditProduct product={undefined} />
    </span>
</Page>
