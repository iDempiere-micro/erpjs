<script lang="ts">
    import { getFactoringContractBy } from '../lib/core/factoringContract';
    import AddOrEditFactoringContract from '../components/add-factoringContract/AddOrEditFactoringContract.svelte';
    import { segments } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const factoringContract = getFactoringContractBy(id);
</script>

<Page
    title={$_('page.factoringContracts.edit.title')}
    segment={segments.factoringContracts}
    name="page.factoringContracts.edit"
>
    <span slot="content">
        {#if $factoringContract.loading}
            {$_('status.loading')}
        {:else if $factoringContract.error}
            {$_('status.error')} {getError($factoringContract.error)}
        {:else if $factoringContract?.data?.factoringContract}
            <AddOrEditFactoringContract
                factoringContract={$factoringContract?.data?.factoringContract}
            />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
