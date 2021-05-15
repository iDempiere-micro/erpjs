<script lang="ts">
    import AddOrEditCustomer from '../components/add-customer/AddOrEditCustomer.svelte';
    import { customerService } from '../lib/core/customer';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);
    customerService.load(id);

    const customer = customerService.stores.detail;
</script>

<Page
    title={$_('page.customers.edit.title')}
    segment={segments.customers}
    name="page.customers.edit"
>
    <span slot="content">
        {#if $customer.loaded}
            <AddOrEditCustomer customer={$customer.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
