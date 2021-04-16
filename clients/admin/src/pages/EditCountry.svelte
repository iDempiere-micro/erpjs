<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { getCountryBy } from '../lib/country';
    import AddOrEditCountry from '../components/add-country/AddOrEditCountry.svelte';
    import { urls } from './pathAndSegment';
    import { getError } from '../lib/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.countries.edit + +id);
    setClient(client);

    const country = getCountryBy(id);
</script>

<Page
    title={$_('page.countries.edit.title')}
    segment={segments.countries}
    name="page.countries.edit"
>
    <span slot="content">
        {#if $country.loading}
            {$_('status.loading')}
        {:else if $country.error}
            {$_('status.error')} {getError($country.error)}
        {:else if $country?.data?.country}
            <AddOrEditCountry country={$country?.data?.country} />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
