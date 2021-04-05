<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditMonthlySalesInvoice from '../components/add-monthly-sales-invoice/AddOrEditMonthlySalesInvoice.svelte';
    import { urls } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';

    const client = apollo(urls.salesInvoices.monthly.add);
    setClient(client);
</script>

<Page
    title={$_('page.salesInvoices.monthly.add.title')}
    segment={segments.salesInvoices}
    name="page.salesInvoices.monthly.add.title"
>
    <span slot="content">
        <AddOrEditMonthlySalesInvoice {client} />
    </span>
</Page>

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
