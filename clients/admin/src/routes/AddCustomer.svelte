<script lang="ts">
    import { apollo } from '../lib/apollo';
    import { authStore } from '../lib/auth';
    import AddOrEditCustomer from '../components/add-customer/AddOrEditCustomer.svelte';
    import { setClient } from 'svelte-apollo';

    const client = apollo($authStore?.token, process.env.API_BASE_URL, 'add-customer');
    setClient(client);
</script>

<AddOrEditCustomer {client} customer={null} />

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
