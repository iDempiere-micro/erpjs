<script lang="ts">
    import type { SalesInvoicesQuery } from '../generated/graphql';
    import SalesInvoiceList from '../components/sales-invoices/SalesInvoiceList.svelte';
    import { getError } from '../lib/support/util';
    import { segments, urls } from './pathAndSegment';
    import { SALES_INVOICES } from '../lib/queries/salesInvoices';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { query } from '../absorb/svelte-apollo';

    const salesInvoices = query<SalesInvoicesQuery, any>(SALES_INVOICES);
</script>

<Page
    title={$_('page.salesInvoices.title')}
    segment={segments.salesInvoices}
    name="page.salesInvoices"
>
    <span slot="content">
        {#if $salesInvoices.loading}
            {$_('status.loading')}
        {:else if $salesInvoices.error}
            {$_('status.error')} {getError($salesInvoices.error)}
        {:else}
            <SalesInvoiceList salesInvoices={$salesInvoices.data?.salesInvoices} />
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
