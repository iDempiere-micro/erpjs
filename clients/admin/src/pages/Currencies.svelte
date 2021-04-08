<script lang="ts">
    import { query } from 'svelte-apollo';
    import type { CurrenciesQuery } from 'src/generated/graphql';
    import { apollo, setClient } from '../lib/apollo';
    import { getError } from '../lib/util';
    import CurrencyList from '../components/currencies/CurrencyList.svelte';
    import { urls } from './pathAndSegment';
    import { CURRENCIES } from '../lib/queries/currencies';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    const client = apollo(urls.currencies.list);
    setClient(client);
    const currencies = query<CurrenciesQuery, any>(CURRENCIES);
</script>

<Page title={$_('page.currencies.title')} segment={segments.currencies} name="page.currencies">
    <span slot="content">
        {#if $currencies.loading}
            {$_('status.loading')}
        {:else if $currencies.error}
            {$_('status.error')} {getError($currencies.error)}
        {:else}
            <CurrencyList currencies={$currencies.data?.currencies} />
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
