<script lang="ts">
    import { apollo, setClient } from '../lib/support/apollo';
    import AddOrEditCurrency from '../components/add-currency/AddOrEditCurrency.svelte';
    import { segments, urls } from './pathAndSegment';
    import Page from '../Page.svelte';
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
