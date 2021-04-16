<script lang="ts">
    import { query } from 'svelte-apollo';
    import type { AccountingSchemesQuery } from 'src/generated/graphql';
    import { apollo, setClient } from '../lib/apollo';
    import { getError } from '../lib/util';
    import AccountingSchemeList from '../components/accountingSchemes/AccountingSchemeList.svelte';
    import { urls } from './pathAndSegment';
    import { ACCOUNTING_SCHEMES } from '../lib/queries/accountingSchemes';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    const client = apollo(urls.accountingSchemes.list);
    setClient(client);
    const accountingSchemes = query<AccountingSchemesQuery, any>(ACCOUNTING_SCHEMES);
</script>

<Page
    segment={segments.accountingSchemes}
    name="page.accountingSchemes"
    title={$_('page.accountingSchemes.title')}
>
    <span slot="content">
        {#if $accountingSchemes.loading}
            {$_('status.loading')}
        {:else if $accountingSchemes.error}
            {$_('status.error')} {getError($accountingSchemes.error)}
        {:else}
            <AccountingSchemeList accountingSchemes={$accountingSchemes.data?.accountingSchemes} />
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.accountingSchemes.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.accountingSchemes.add.title')}</a
        >
    </span>
</Page>
