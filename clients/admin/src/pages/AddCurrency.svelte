<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditCurrency from '../components/add-currency/AddOrEditCurrency.svelte';
    import { urls } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';

    const client = apollo(urls.currencies.add);
    setClient(client);
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
