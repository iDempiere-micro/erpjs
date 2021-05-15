<script lang="ts">
    import AddOrEditCurrency from '../components/add-currency/AddOrEditCurrency.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { currencyService } from '../lib/core';

    export let params: any = {};
    const id = parseInt('' + params.id);
    currencyService.load(id);

    const currency = currencyService.stores.detail;
</script>

<Page
    title={$_('page.currencies.edit.title')}
    segment={segments.currencies}
    name="page.currencies.edit"
>
    <span slot="content">
        {#if $currency.loaded}
            <AddOrEditCurrency currency={$currency.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
