<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { getSalesInvoiceBy } from '../lib/salesInvoices';
    import { getError } from '../lib/util';
    import { urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';
    import { authStore } from '../lib/auth';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.customer.edit + id);
    setClient(client);

    const salesInvoice = getSalesInvoiceBy(id);

    let invoiceContent;

    const loadInvoiceContent = async () => {
        const result = await fetch(
            process.env.API_BASE_URL.replace('graphql', 'file/sales-invoice/' + id),
            {
                headers: {
                    'Content-Type': 'application/pdf',
                    Authorization: 'Bearer ' + (process.env.FAKE_TOKEN || authStore?.get()?.token),
                },
            },
        );
        const { data } = await result.json();
        invoiceContent = data;
    };

    loadInvoiceContent();
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
    </span>
</Page>

<style>
    iframe {
        width: 100%;
        height: 600px;
    }
</style>
