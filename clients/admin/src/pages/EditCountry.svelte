<script lang="ts">
    import { getCountryBy } from '../lib/core/country';
    import AddOrEditCountry from '../components/add-country/AddOrEditCountry.svelte';
    import { segments } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

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
