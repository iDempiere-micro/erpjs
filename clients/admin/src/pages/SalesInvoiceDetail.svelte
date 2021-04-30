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
    import CustomerDetailPageHeader from '../components/customer-detail/CustomerDetailPageHeader.svelte';
    import SalesInvoicePageHeader from '../components/sales-invoice-detail/SalesInvoicePageHeader.svelte';
    import Break from '../molecules/form/Break.svelte';

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

<Page segment={segments.salesInvoices} name="page.salesInvoices.detail">
    <span slot="header">
        {#if $salesInvoice?.data?.salesInvoice}
            <CustomerDetailPageHeader id={$salesInvoice?.data?.salesInvoice?.customer?.id || -1} />
            <Break />
            <SalesInvoicePageHeader id={$salesInvoice?.data?.salesInvoice?.id || -1} />
        {:else}
            {$_('page.salesInvoices.detail.title')}
        {/if}
    </span>
    <span slot="content">
        {#if $salesInvoice.loading}
            {$_('status.loading')}
        {:else if $salesInvoice.error}
            {$_('status.error')} {getError($salesInvoice.error)}
        {:else if $salesInvoice?.data?.salesInvoice}
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.salesInvoices.detail.internalInformation')}
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                        {$_('page.salesInvoices.detail.description.internalInformation')}
                    </p>
                </div>
                <div class="border-t border-gray-200">
                    <dl>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.salesInvoices.detail.documentNo')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {$salesInvoice?.data?.salesInvoice.documentNo}
                            </dd>
                        </div>
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.salesInvoices.detail.organization')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {$salesInvoice?.data?.salesInvoice.organization.displayName}
                            </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.salesInvoices.detail.customer')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {$salesInvoice?.data?.salesInvoice.customer.displayName}
                            </dd>
                        </div>
                        {#if $salesInvoice?.data?.salesInvoice.factoringProvider}
                            <div
                                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                            >
                                <dt class="text-sm font-medium text-gray-500">
                                    {$_('page.salesInvoices.detail.factoringProvider')}
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {$salesInvoice?.data?.salesInvoice.factoringProvider
                                        ?.displayName}
                                </dd>
                            </div>
                        {/if}
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.salesInvoices.detail.transactionDate')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {$salesInvoice?.data?.salesInvoice.transactionDate}
                            </dd>
                        </div>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.salesInvoices.detail.totalLines')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {$salesInvoice?.data?.salesInvoice.totalLines}
                                {$salesInvoice.data?.salesInvoice?.currency?.displayName}
                                = {$salesInvoice?.data?.salesInvoice
                                    .totalLinesAccountingSchemeCurrency}
                                {$salesInvoice?.data?.salesInvoice.organization.accountingScheme
                                    .currency.displayName}
                            </dd>
                        </div>
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Attachments</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <ul
                                    class="border border-gray-200 rounded-md divide-y divide-gray-200"
                                >
                                    <li
                                        class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                                    >
                                        <div class="w-0 flex-1 flex items-center">
                                            <!-- Heroicon name: paper-clip -->
                                            <svg
                                                class="flex-shrink-0 h-5 w-5 text-gray-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                            <span class="ml-2 flex-1 w-0 truncate">
                                                resume_back_end_developer.pdf
                                            </span>
                                        </div>
                                        <div class="ml-4 flex-shrink-0">
                                            <a
                                                href="/"
                                                class="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                    <li
                                        class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                                    >
                                        <div class="w-0 flex-1 flex items-center">
                                            <!-- Heroicon name: paper-clip -->
                                            <svg
                                                class="flex-shrink-0 h-5 w-5 text-gray-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                            <span class="ml-2 flex-1 w-0 truncate">
                                                coverletter_back_end_developer.pdf
                                            </span>
                                        </div>
                                        <div class="ml-4 flex-shrink-0">
                                            <a
                                                class="font-medium text-indigo-600 hover:text-indigo-500"
                                                href="/"
                                            >
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <iframe style="width:100%;" src={`data:application/pdf;base64,${invoiceContent}`} />
        {:else}
            {$_('status.error')}
        {/if}

        {#if $salesInvoice?.data?.salesInvoice.isDraft}
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
