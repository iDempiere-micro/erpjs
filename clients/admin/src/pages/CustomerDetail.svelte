<script lang="ts">
    import { customerService, getCustomerGroupBy } from '../lib/core';
    import { segments } from './pathAndSegment';
    import { getError, printableString } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import CustomerDetailPageHeader from '../components/customer-detail/CustomerDetailPageHeader.svelte';
    import Break from '../molecules/form/Break.svelte';
    import type {
        CustomerGroupByIdQuery,
        CustomerGroupDetailPartsFragment,
    } from '../generated/graphql';
    import type { ReadableQuery } from '../absorb/svelte-apollo';
    import type { CustomerDetail } from '../lib/model/customer';

    export let params: any = {};
    const id = parseInt('' + params.id);
    customerService.load(id);

    const customerResult = customerService.stores.detail;
    let customerGroupResult: ReadableQuery<CustomerGroupByIdQuery>;
    let customerGroup: CustomerGroupDetailPartsFragment = {} as any;
    let customer: CustomerDetail = customerService.getDetailSafeEntity();
    let address = {} as any;

    $: {
        if ($customerResult.loaded && !customer.id) {
            customer = $customerResult.data;
            address = customer.address || {};
        }
        if (customer.customerGroup?.id && !customerGroupResult) {
            customerGroupResult = getCustomerGroupBy(customer.customerGroup?.id || -1);
        }
        if ($customerGroupResult?.data?.customerGroup && !customerGroup.id) {
            customerGroup = $customerGroupResult.data?.customerGroup || ({} as any);
        }
    }
</script>

<Page segment={segments.customers} name="page.customer.detail">
    <span slot="content">
        {#if $customerResult.loading}
            {$_('status.loading')}
        {:else if $customerResult.error}
            {$_('status.error')} {getError($customerResult.error)}
        {:else if customer.id}

        {:else}
            {$_('status.error')}
        {/if}
    </span>
    <span slot="header">
        <CustomerDetailPageHeader {customer} />
    </span>
</Page>
