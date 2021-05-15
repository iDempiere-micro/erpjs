<script lang="ts">
    import { salesInvoiceService } from '../lib/core';
    import { throwOnUndefined } from '../lib/support/util';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import CustomerDetailPageHeader from '../components/customer-detail/CustomerDetailPageHeader.svelte';
    import SalesInvoicePageHeader from '../components/sales-invoice-detail/SalesInvoicePageHeader.svelte';
    import Break from '../molecules/form/Break.svelte';
    import OrganizationDetailPageHeader from '../components/organization-detail/OrganizationDetailPageHeader.svelte';
    import SalesInvoicePublish from '../components/sales-invoice-detail/SalesInvoicePublish.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    salesInvoiceService.load(id);
    const salesInvoice = salesInvoiceService.stores.detail;

    let invoiceContent: string;

    const loadInvoiceContent = async () => {
        const baseUrl = process.env.API_BASE_URL || throwOnUndefined();
        const result = await fetch(baseUrl.replace('graphql', 'file/sales-invoice/' + id), {
            headers: {
                'Content-Type': 'application/pdf',
                Authorization: 'Bearer ' + (process.env.FAKE_TOKEN || (window as any).token),
            },
        });
        const { data } = await result.json();
        invoiceContent = data;
    };

    loadInvoiceContent();

    const confirmSalesInvoiceClick = async () => {
        await salesInvoiceService.confirm(id);
        await loadInvoiceContent();
    };
</script>

<Page segment={segments.salesInvoices} name="page.salesInvoices.detail">
    <span slot="header">
        {#if $salesInvoice.loaded}
            <CustomerDetailPageHeader id={$salesInvoice.data.customer?.id || -1} />
            <Break />
            <SalesInvoicePageHeader id={$salesInvoice.data.id || -1} />
            <Break />
            <OrganizationDetailPageHeader id={$salesInvoice.data.organization?.id || -1} />
        {:else}
            {$_('page.salesInvoices.detail.title')}
        {/if}
    </span>
    <span slot="content">
        {#if $salesInvoice.loaded}
            <SalesInvoicePublish data={$salesInvoice.data} />

            <iframe style="width:100%;" src={`data:application/pdf;base64,${invoiceContent}`} />
        {:else}
            {$_('status.loading')}
        {/if}

        {#if $salesInvoice.loaded && $salesInvoice.data.isDraft}
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    on:click|preventDefault={confirmSalesInvoiceClick}
                >
                    {$_('page.salesInvoices.detail.confirm')}
                </button>
            </div>
        {/if}
    </span>
</Page>

<style>
    iframe {
        width: 100%;
        height: 600px;
    }
</style>
