<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { getAccountingSchemeBy } from '../lib/accountingScheme';
    import AddOrEditAccountingScheme from '../components/add-accountingScheme/AddOrEditAccountingScheme.svelte';
    import { urls } from './pathAndSegment';
    import { getError } from '../lib/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.accountingSchemes.edit + +id);
    setClient(client);

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
