<script lang="ts">
    import type { CountriesQuery } from '../generated/graphql';
    import { getError } from '../lib/support/util';
    import CountryList from '../components/countries/CountryList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { COUNTRIES } from '../lib/queries/countries';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { query } from '../absorb/svelte-apollo';

    const countries = query<CountriesQuery, any>(COUNTRIES);
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
