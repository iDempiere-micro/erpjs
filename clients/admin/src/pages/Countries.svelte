<script lang="ts">
    import { query } from 'svelte-apollo';
    import type { CountriesQuery } from 'src/generated/graphql';
    import { apollo, setClient } from '../lib/apollo';
    import { getError } from '../lib/util';
    import CountryList from '../components/countries/CountryList.svelte';
    import { urls } from './pathAndSegment';
    import { COUNTRIES } from '../lib/queries/countries';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    const client = apollo(urls.countries.list);
    setClient(client);
    const countries = query<CountriesQuery, any>(PRODUCTS);
</script>

<Page title={$_('page.countries.title')} segment={segments.countries} name="page.countries">
    <span slot="content">
        {#if $countries.loading}
            {$_('status.loading')}
        {:else if $countries.error}
            {$_('status.error')} {getError($countries.error)}
        {:else}
            <CountryList countries={$countries.data?.countries} />
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.countries.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.countries.add.title')}</a
        >
    </span>
</Page>
