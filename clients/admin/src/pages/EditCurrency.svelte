<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { getCurrencyBy } from '../lib/currency';
    import AddOrEditCurrency from '../components/add-currency/AddOrEditCurrency.svelte';
    import { segments, urls } from './pathAndSegment';
    import { getError } from '../lib/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.currencies.edit + +id);
    setClient(client);

    const currency = getCurrencyBy(id);
</script>

<Page
    title={$_('page.currencies.edit.title')}
    segment={segments.currencies}
    name="page.currencies.edit"
>
    <span slot="content">
        {#if $currency.loading}
            {$_('status.loading')}
        {:else if $currency.error}
            {$_('status.error')} {getError($currency.error)}
        {:else if $currency?.data?.currency}
            <AddOrEditCurrency currency={$currency?.data?.currency} />
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
