<script lang="ts">
    import AddOrEditSalesInvoice from '../components/add-sales-invoice/AddOrEditSalesInvoice.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
</script>

<Page
    title={$_('page.salesInvoices.add.title')}
    segment={segments.salesInvoices}
    name="page.salesInvoices.add.title"
>
    name={'page.salesInvoices.add.title'}
    <span slot="content">
        <AddOrEditSalesInvoice salesInvoice={undefined} />
    </span>
</Page>
