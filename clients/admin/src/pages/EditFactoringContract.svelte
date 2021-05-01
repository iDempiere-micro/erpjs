<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { getFactoringContractBy } from '../lib/factoringContract';
    import AddOrEditFactoringContract from '../components/add-factoringContract/AddOrEditFactoringContract.svelte';
    import { segments, urls } from './pathAndSegment';
    import { getError } from '../lib/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.factoringContracts.edit + +id);
    setClient(client);

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
