<script lang="ts">
    import { query, setClient } from 'svelte-apollo';
    import gql from 'graphql-tag';
    import { authStore } from '../lib/auth';
    import { apollo } from '../lib/apollo';
    import CustomerList from '../components/customers/CustomerList.svelte';
    import { getError } from '../lib/util';
    import type { Customer } from 'src/generated/graphql';

    const EVERYTHING = gql`
        {
            customers {
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

    const client = apollo($authStore?.token, process.env.API_BASE_URL, 'customers');
    setClient(client);
    const customers = query<Customer[]>(EVERYTHING);
</script>

{#if $customers.loading}
    Loading...
{:else if $customers.error}
    Error:{getError($customers.error)}
{:else}
    <CustomerList customers={$customers.data?.customers} />
{/if}
