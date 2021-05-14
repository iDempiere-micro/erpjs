<script lang="ts">
    import AddOrEditSalesInvoice from '../components/add-sales-invoice/AddOrEditSalesInvoice.svelte';
    import { salesInvoiceService } from '../lib/core';
    import { getError } from '../lib/support/util';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);
    salesInvoiceService.load(id);

    const salesInvoice = salesInvoiceService.stores.detail;
</script>

<Page
    title={$_('page.salesInvoices.edit.title')}
    segment={segments.salesInvoices}
    name="page.salesInvoices.edit"
>
    <span slot="content">
        {#if $salesInvoice.loaded}
            <AddOrEditSalesInvoice salesInvoice={$salesInvoice.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
