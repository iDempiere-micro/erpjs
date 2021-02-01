<script lang="ts">
    import { apollo } from '../lib/apollo';
    import { authStore } from '../lib/auth';
    import AddOrEditCustomer from '../components/add-customer/AddOrEditCustomer.svelte';
    import { setClient } from 'svelte-apollo';
    import gql from 'graphql-tag';
    import type { ApolloQueryResult } from '@apollo/client';

    export let id: number;
    id = parseInt('' + id);

    const client = apollo($authStore?.token, process.env.API_BASE_URL, 'customer/' + id);
    setClient(client);

    const GET_CUSTOMER_BY_ID = gql`
        query CustomersByArgs($id: Int!) {
            customer(id: $id) {
                id
                legalName
                displayName
                vatNumber
                invoicingEmail
                legalAddress {
                    id
                    city
                    line1
                    zipCode
                    country {
                        id
                        isoCode
                    }
                }
            }
        }
    `;
    const getCustomerBy = () =>
        client.query({
            query: GET_CUSTOMER_BY_ID,
            variables: { id },
        });
    let customer: ApolloQueryResult<any> | null = null;

    const load = async () => {
        customer = await getCustomerBy();
    };
    load();
</script>

{#if !customer}
    Loading...
{:else if customer.error}
    Error: {customer.error.message}
{:else}
    <AddOrEditCustomer {client} customer={customer.data.customer} />
{/if}

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
