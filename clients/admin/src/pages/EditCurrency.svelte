<script lang="ts">
    import { getCurrencyBy } from '../lib/core/currency';
    import AddOrEditCurrency from '../components/add-currency/AddOrEditCurrency.svelte';
    import { segments } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

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
