<script lang="ts">
    import CountryList from '../components/countries/CountryList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { countryService } from '../lib/core';

    countryService.loadList();

    const countries = countryService.stores.list;
</script>

<Page title={$_('page.countries.title')} segment={segments.countries} name="page.countries">
    <span slot="content">
        {#if $countries.loaded}
            <CountryList countries={$countries.data} />
        {:else}
            {$_('status.loading')}
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
