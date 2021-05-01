<script lang="ts">
    import AddOrEditCustomer from '../components/add-customer/AddOrEditCustomer.svelte';
    import { getCustomerBy } from '../lib/core/customer';
    import { segments } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

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
            <AddOrEditCustomer customer={$customer?.data?.customer} />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
