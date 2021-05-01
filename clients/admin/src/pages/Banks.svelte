<script lang="ts">
    import type { BanksQuery } from 'src/generated/graphql';
    import { apollo, setClient } from '../lib/support/apollo';
    import { getError } from '../lib/support/util';
    import BankList from '../components/banks/BankList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { BANKS } from '../lib/queries/banks';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { query } from '../absorb/svelte-apollo';

    const client = apollo(urls.banks.list);
    setClient(client);
    const banks = query<BanksQuery, any>(BANKS);
</script>

<Page title={$_('page.banks.title')} segment={segments.banks} name="page.banks">
    <span slot="content">
        {#if $banks.loading}
            {$_('status.loading')}
        {:else if $banks.error}
            {$_('status.error')} {getError($banks.error)}
        {:else}
            <BankList banks={$banks.data?.banks} />
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
