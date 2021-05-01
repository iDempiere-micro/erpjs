<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditCustomer from '../components/add-customer/AddOrEditCustomer.svelte';
    import { getCustomerBy } from '../lib/customer';
    import { segments, urls } from './pathAndSegment';
    import { getError } from '../lib/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.customer.edit + id);
    setClient(client);

    const customer = getCustomerBy(id);
</script>

<Page
    title={$_('page.customers.edit.title')}
    segment={segments.customers}
    name="page.customers.edit"
>
    <span slot="content">
        {#if $customer.loading}
            {$_('status.loading')}
        {:else if $customer.error}
            {$_('status.error')} {getError($customer.error)}
        {:else if $customer?.data?.customer}
            <AddOrEditCustomer {client} customer={$customer?.data?.customer} />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
