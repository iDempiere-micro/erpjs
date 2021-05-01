<script lang="ts">
    import { getAccountingSchemeBy } from '../lib/core/accountingScheme';
    import AddOrEditAccountingScheme from '../components/add-accountingScheme/AddOrEditAccountingScheme.svelte';
    import { segments } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const accountingScheme = getAccountingSchemeBy(id);
</script>

<Page
    title={$_('page.accountingSchemes.edit.title')}
    segment={segments.accountingSchemes}
    name="page.accountingSchemes.edit"
>
    <span slot="content">
        {#if $accountingScheme.loading}
            {$_('status.loading')}
        {:else if $accountingScheme.error}
            {$_('status.error')} {getError($accountingScheme.error)}
        {:else if $accountingScheme?.data?.accountingScheme}
            <AddOrEditAccountingScheme
                accountingScheme={$accountingScheme?.data?.accountingScheme}
            />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
