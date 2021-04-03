<script>
    import SalesInvoicesInTime from '../components/reports/SalesInvoicesInTime.svelte';
    import Page from '../Page.svelte';
</script>

<Page title="Dashboard" segment="">
    <span slot="content">
        <SalesInvoicesInTime />
    </span>
</Page>
