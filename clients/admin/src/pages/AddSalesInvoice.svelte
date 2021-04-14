<script lang="ts">
    import { setClient, apollo } from '../lib/apollo';
    import AddOrEditSalesInvoice from '../components/add-sales-invoice/AddOrEditSalesInvoice.svelte';
    import { urls, segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';

    setClient(apollo(urls.customer.add));
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
