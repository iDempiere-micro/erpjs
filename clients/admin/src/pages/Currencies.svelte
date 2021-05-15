<script lang="ts">
    import CurrencyList from '../components/currencies/CurrencyList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { currencyService } from '../lib/core';

    currencyService.loadList();
    const currencies = currencyService.stores.list;
</script>

<Page title={$_('page.currencies.title')} segment={segments.currencies} name="page.currencies">
    <span slot="content">
        {#if $currencies.loaded}
            <CurrencyList currencies={$currencies.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.currencies.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.currencies.add.title')}</a
        >
    </span>
</Page>
