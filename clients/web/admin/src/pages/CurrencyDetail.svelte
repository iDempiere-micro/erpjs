<script lang="ts">
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import CurrencyDetail from '../components/currency-detail/CurrencyDetail.svelte';
    import { currencyService } from '../lib/core';

    export let params: any = {};
    const id = parseInt('' + params.id);

    currencyService.load(id);
    const currency = currencyService.stores.detail;
</script>

<Page
    segment={segments.currencies}
    name="page.currency.detail"
    title={$_('page.currencies.detail.title')}
>
    <span slot="content">
        {#if $currency.loaded}
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.currencies.detail.info')}
                    </h3>
                </div>
                <CurrencyDetail currency={$currency.data} />
            </div>
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
