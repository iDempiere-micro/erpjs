<script lang="ts">
    import { query, setClient } from 'svelte-apollo';
    import type { Unnamed_1_Query } from '../generated/graphql';
    import gql from 'graphql-tag';
    import { authStore } from '../lib/auth';
    import { apollo } from '../lib/apollo';
    import SalesInvoiceList from '../components/sales-invoices/SalesInvoiceList.svelte';
    import { getError } from '../lib/util';

    const EVERYTHING = gql`
        {
            salesInvoices {
              documentNo
              grandTotalAccountingSchemeCurrency
            }
        }
    `;

    const client = apollo($authStore?.token, process.env.API_BASE_URL, 'sales-invoices');
    setClient(client);
    const salesInvoices = query<any>(EVERYTHING);
</script>

{#if $salesInvoices.loading}
    Loading...
{:else if $salesInvoices.error}
    Error:{getError($salesInvoices.error)}
{:else}
    <SalesInvoiceList salesInvoices={$salesInvoices.data?.salesInvoices} />
{/if}
