<script lang="ts">
    import { countryService } from '../lib/core';
    import AddOrEditCountry from '../components/add-country/AddOrEditCountry.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    countryService.load(id);

    const store = countryService.stores.detail;
</script>

<Page
    title={$_('page.countries.edit.title')}
    segment={segments.countries}
    name="page.countries.edit"
>
    <span slot="content">
        {#if $store.loaded}
            <AddOrEditCountry country={$store.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
