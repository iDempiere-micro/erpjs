<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditSalesInvoice from '../components/add-sales-invoice/AddOrEditSalesInvoice.svelte';
    import { getSalesInvoiceBy } from '../lib/salesInvoices';
    import { getError } from '../lib/util';
    import { urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.customer.edit + id);
    setClient(client);

    const salesInvoice = getSalesInvoiceBy(id);
</script>

<Page title={$_('page.salesInvoices.detail.title')} segment={segments.salesInvoices}>
    <span slot="content">
        {#if $salesInvoice.loading}
            {$_('status.loading')}
        {:else if $salesInvoice.error}
            {$_('status.error')} {getError($salesInvoice.error)}
        {:else if $salesInvoice?.data?.salesInvoice}
            Sales invoice detail here
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
