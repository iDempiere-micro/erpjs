<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditMonthlySalesInvoice from '../components/add-monthly-sales-invoice/AddOrEditMonthlySalesInvoice.svelte';
    import { segments, urls } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';

    setClient(apollo(urls.salesInvoices.monthly.add));
</script>

<Page
    title={$_('page.salesInvoices.monthly.add.title')}
    segment={segments.salesInvoices}
    name="page.salesInvoices.monthly.add.title"
>
    <span slot="content">
        <AddOrEditMonthlySalesInvoice />
    </span>
</Page>
