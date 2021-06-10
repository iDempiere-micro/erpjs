<script lang="ts">
    import AccountingSchemeList from '../components/accountingSchemes/AccountingSchemeList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { accountingSchemeService } from '../lib/core';

    accountingSchemeService.loadList();

    const accountingSchemes = accountingSchemeService.stores.list;
</script>

<Page
    segment={segments.accountingSchemes}
    name="page.accountingSchemes"
    title={$_('page.accountingSchemes.title')}
>
    <span slot="content">
        {#if $accountingSchemes.loaded}
            <AccountingSchemeList accountingSchemes={$accountingSchemes.data} />
        {:else}
            {$_('status.loading')}
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
