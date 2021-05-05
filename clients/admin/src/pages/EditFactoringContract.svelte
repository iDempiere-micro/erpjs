<script lang="ts">
    import AddOrEditFactoringContract from '../components/add-factoringContract/AddOrEditFactoringContract.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { factoringContractService } from '../lib/core';

    export let params: any = {};
    const id = parseInt('' + params.id);
    factoringContractService.load(id);

    const factoringContract = factoringContractService.stores.detail;
</script>

<Page
    title={$_('page.factoringContracts.edit.title')}
    segment={segments.factoringContracts}
    name="page.factoringContracts.edit"
>
    <span slot="content">
        {#if $factoringContract.loaded}
            <AddOrEditFactoringContract factoringContract={$factoringContract.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
