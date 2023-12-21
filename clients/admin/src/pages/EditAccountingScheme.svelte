<script lang="ts">
    import { accountingSchemeService } from '../lib/core';
    import AddOrEditAccountingScheme from '../components/add-accountingScheme/AddOrEditAccountingScheme.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    accountingSchemeService.load(id);

    const store = accountingSchemeService.stores.detail;
</script>

<Page
    title={$_('page.accountingSchemes.edit.title')}
    segment={segments.accountingSchemes}
    name="page.accountingSchemes.edit"
>
    <span slot="content">
        {#if $store.loaded}
            <AddOrEditAccountingScheme accountingScheme={$store.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
