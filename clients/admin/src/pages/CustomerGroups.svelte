<script lang="ts">
    import { query } from 'svelte-apollo';
    import type { CustomerGroupsQuery } from 'src/generated/graphql';
    import { apollo, setClient } from '../lib/apollo';
    import { getError } from '../lib/util';
    import CustomerGroupList from '../components/customerGroups/CustomerGroupList.svelte';
    import { urls } from './pathAndSegment';
    import { CUSTOMER_GROUPS } from '../lib/queries/customerGroups';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    const client = apollo(urls.customerGroups.list);
    setClient(client);
    const CustomerGroups = query<CustomerGroupsQuery, any>(CUSTOMER_GROUPS);
</script>

<Page
    segment={segments.customerGroups}
    name="page.customerGroups"
    title={$_('page.customerGroups.title')}
>
    <span slot="content">
        {#if $CustomerGroups.loading}
            {$_('status.loading')}
        {:else if $CustomerGroups.error}
            {$_('status.error')} {getError($CustomerGroups.error)}
        {:else}
            <CustomerGroupList customerGroups={$CustomerGroups.data?.customerGroups} />
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.customerGroups.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.customerGroups.add.title')}</a
        >
    </span>
</Page>
