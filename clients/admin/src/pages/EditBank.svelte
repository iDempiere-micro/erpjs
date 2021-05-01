<script lang="ts">
    import { getBankBy } from '../lib/core/bank';
    import AddOrEditBank from '../components/add-bank/AddOrEditBank.svelte';
    import { segments } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

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
