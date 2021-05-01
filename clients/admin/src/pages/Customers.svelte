<script lang="ts">
    import { query } from 'svelte-apollo';
    import { apollo, setClient } from '../lib/support/apollo';
    import CustomerList from '../components/customers/CustomerList.svelte';
    import { getError } from '../lib/support/util';
    import type { CustomersQuery } from 'src/generated/graphql';
    import { segments, urls } from './pathAndSegment';
    import { CUSTOMERS } from '../lib/queries/customers';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    const client = apollo(segments.customers);
    setClient(client);
    const customers = query<CustomersQuery>(CUSTOMERS);
</script>

<Page title={$_('page.customers.title')} segment={segments.customers} name="page.customers">
    <span slot="content">
        {#if $customers.loading}
            {$_('status.loading')}
        {:else if $customers.error}
            {$_('status.error')} {getError($customers.error)}
        {:else}
            <CustomerList customers={$customers.data?.customers} />
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.customer.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.customers.add.nav')}</a
        >
    </span>
</Page>
