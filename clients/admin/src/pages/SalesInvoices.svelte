<script lang="ts">
    import SalesInvoiceList from '../components/sales-invoices/SalesInvoiceList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { salesInvoiceService } from '../lib/core';

    salesInvoiceService.loadList();
    const salesInvoices = salesInvoiceService.stores.list;
</script>

<Page
    title={$_('page.salesInvoices.title')}
    segment={segments.salesInvoices}
    name="page.salesInvoices"
>
    <span slot="content">
        {#if $salesInvoices.loaded}
            <SalesInvoiceList salesInvoices={$salesInvoices.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.salesInvoices.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.salesInvoices.add.title')}</a
        >
        <a
            href="#/{urls.salesInvoices.monthly.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.salesInvoices.monthly.add.title')}</a
        >
    </span>
</Page>
