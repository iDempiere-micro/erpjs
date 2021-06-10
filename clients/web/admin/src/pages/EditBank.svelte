<script lang="ts">
    import { bankService } from '../lib/core';
    import AddOrEditBank from '../components/add-bank/AddOrEditBank.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    bankService.load(id);

    const store = bankService.stores.detail;
</script>

<Page title={$_('page.banks.edit.title')} segment={segments.banks} name="page.banks.edit">
    <span slot="content">
        {#if $store.loaded}
            <AddOrEditBank bank={$store.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
