<script lang="ts">
    import type { FactoringContractsQuery } from '../generated/graphql';
    import { getError } from '../lib/support/util';
    import FactoringContractList from '../components/factoringContracts/FactoringContractList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { FACTORING_CONTRACTS } from '../lib/queries/factoringContracts';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { query } from '../absorb/svelte-apollo';

    const factoringContracts = query<FactoringContractsQuery, any>(FACTORING_CONTRACTS);
</script>

<Page
    segment={segments.factoringContracts}
    name="page.factoringContracts"
    title={$_('page.factoringContracts.title')}
>
    <span slot="content">
        {#if $factoringContracts.loading}
            {$_('status.loading')}
        {:else if $factoringContracts.error}
            {$_('status.error')} {getError($factoringContracts.error)}
        {:else}
            <FactoringContractList
                factoringContracts={$factoringContracts.data?.factoringContracts}
            />
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.factoringContracts.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.factoringContracts.add.title')}</a
        >
    </span>
</Page>
