<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { getSalesInvoiceBy } from '../lib/salesInvoices';
    import { getError, throwOnUndefined } from '../lib/util';
    import { urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';
    import { authStore } from '../lib/auth';
    import { mutation } from 'svelte-apollo';
    import type {
        ConfirmSalesInvoiceMutation,
        ConfirmSalesInvoiceMutationVariables,
    } from '../generated/graphql';
    import { CONFIRM_SALES_INVOICE } from '../lib/queries/salesInvoice';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.customer.edit + id);
    setClient(client);
    const confirmSalesInvoice = mutation<
        ConfirmSalesInvoiceMutation,
        ConfirmSalesInvoiceMutationVariables
    >(CONFIRM_SALES_INVOICE);

    let salesInvoice = getSalesInvoiceBy(id);

    let invoiceContent: string;

    const loadInvoiceContent = async () => {
        const baseUrl = process.env.API_BASE_URL || throwOnUndefined();
        const result = await fetch(baseUrl.replace('graphql', 'file/sales-invoice/' + id), {
            headers: {
                'Content-Type': 'application/pdf',
                Authorization: 'Bearer ' + (process.env.FAKE_TOKEN || authStore?.get()?.token),
            },
        });
        const { data } = await result.json();
        invoiceContent = data;
    };

    loadInvoiceContent();

    const confirmSalesInvoiceClick = async () => {
        const data = await confirmSalesInvoice({
            variables: {
                id,
            },
        });
        await loadInvoiceContent();
        // TODO: fix typings so we do not have to reload everything
        salesInvoice = getSalesInvoiceBy(id);
    };
</script>

<Page
    title={$_('page.salesInvoices.detail.title')}
    segment={segments.salesInvoices}
    name="page.salesInvoices.detail"
>
    <span slot="content">
        {#if $salesInvoice.loading}
            {$_('status.loading')}
        {:else if $salesInvoice.error}
            {$_('status.error')} {getError($salesInvoice.error)}
        {:else if $salesInvoice?.data?.salesInvoice}
            {$salesInvoice?.data?.salesInvoice.documentNo}

            <iframe src={`data:application/pdf;base64,${invoiceContent}`} />
        {:else}
            {$_('status.error')}
        {/if}

        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                on:click|preventDefault={confirmSalesInvoiceClick}
            >
                {$_('page.salesInvoices.detail.confirm')}
            </button>
        </div>
    </span>
</Page>

<style>
    iframe {
        width: 100%;
        height: 600px;
    }
</style>
