<script lang="ts">
    import { customerService } from '../lib/core';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import CustomerDetailPageHeader from '../components/customer-detail/CustomerDetailPageHeader.svelte';
    import CustomerDetail from '../components/customer-detail/CustomerDetail.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);
    customerService.load(id);

    const customerResult = customerService.stores.detail;
</script>

<Page segment={segments.customers} name="page.customer.detail">
    <span slot="content">
        {#if $customerResult.loaded}
            <CustomerDetail customer={$customerResult.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
    <span slot="header">
        {#if $customerResult.loaded}
            <CustomerDetailPageHeader
                customer={$customerResult.data}
                id={$customerResult.data.id}
            />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
