<script lang="ts">
    import AddOrEditMonthlySalesInvoice from '../components/add-monthly-sales-invoice/AddOrEditMonthlySalesInvoice.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
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
