<script lang="ts">
    import BankList from '../components/banks/BankList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { bankService } from '../lib/core';

    bankService.loadList();

    const banks = bankService.stores.list;
</script>

<Page title={$_('page.banks.title')} segment={segments.banks} name="page.banks">
    <span slot="content">
        {#if $banks.loaded}
            <BankList banks={$banks.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.banks.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.banks.add.title')}</a
        >
    </span>
</Page>
