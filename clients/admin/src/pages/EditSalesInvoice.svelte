<script lang="ts">
    import { apollo, setClient } from '../lib/support/apollo';
    import AddOrEditSalesInvoice from '../components/add-sales-invoice/AddOrEditSalesInvoice.svelte';
    import { getSalesInvoiceBy } from '../lib/core/salesInvoices';
    import { getError } from '../lib/support/util';
    import { segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    setClient(apollo(urls.customer.edit + id));

    const salesInvoice = getSalesInvoiceBy(id);
</script>

<Page
    title={$_('page.salesInvoices.edit.title')}
    segment={segments.salesInvoices}
    name="page.salesInvoices.edit"
>
    <span slot="content">
        {#if $salesInvoice.loading}
            {$_('status.loading')}
        {:else if $salesInvoice.error}
            {$_('status.error')} {getError($salesInvoice.error)}
        {:else if $salesInvoice?.data?.salesInvoice}
            <AddOrEditSalesInvoice salesInvoice={$salesInvoice?.data?.salesInvoice} />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
