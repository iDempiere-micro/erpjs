<script lang="ts">
    import { apollo } from '../lib/apollo';
    import { authStore } from '../lib/auth';
    import AddOrEditCustomer from '../components/add-customer/AddOrEditCustomer.svelte';
    import { setClient } from 'svelte-apollo';
    import type { ApolloQueryResult } from '@apollo/client';
    import { getCustomerBy } from '../lib/customer';

    export let id: number;
    id = parseInt('' + id);

    const client = apollo($authStore?.token, process.env.API_BASE_URL, 'customer/' + id);
    setClient(client);

    const customer = getCustomerBy(id);
</script>

{#if $customer.loading}
    Loading...
{:else if $customer.error}
    Error: {$customer.error.message}
{:else}
    <AddOrEditCustomer {client} customer={$customer.data.customer} />
{/if}

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
