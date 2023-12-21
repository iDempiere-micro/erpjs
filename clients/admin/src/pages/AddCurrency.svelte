<script lang="ts">
    import AddOrEditCurrency from '../components/add-currency/AddOrEditCurrency.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
</script>

<Page
    title={$_('page.currencies.add.title')}
    segment={segments.currencies}
    name="page.currencies.add.title"
>
    <span slot="content">
        <AddOrEditCurrency currency={undefined} />
    </span>
</Page>

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
