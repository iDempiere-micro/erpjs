<script lang="ts">
    import { apollo } from '../lib/apollo';
    import { authStore } from '../lib/auth';
    import AddOrEditMonthlySalesInvoice from '../components/add-monthly-sales-invoice/AddOrEditMonthlySalesInvoice.svelte';
    import { setClient } from 'svelte-apollo';

    const client = apollo($authStore?.token, process.env.API_BASE_URL, 'add-monthly-sales-invoice');
    setClient(client);
</script>

<AddOrEditMonthlySalesInvoice {client} customer={null} />

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
