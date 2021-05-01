<script lang="ts">
    import { apollo, setClient } from '../lib/support/apollo';
    import { getBankBy } from '../lib/core/bank';
    import AddOrEditBank from '../components/add-bank/AddOrEditBank.svelte';
    import { segments, urls } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.banks.edit + +id);
    setClient(client);

    const bank = getBankBy(id);
</script>

<Page title={$_('page.banks.edit.title')} segment={segments.banks} name="page.banks.edit">
    <span slot="content">
        {#if $bank.loading}
            {$_('status.loading')}
        {:else if $bank.error}
            {$_('status.error')} {getError($bank.error)}
        {:else if $bank?.data?.bank}
            <AddOrEditBank bank={$bank?.data?.bank} />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
