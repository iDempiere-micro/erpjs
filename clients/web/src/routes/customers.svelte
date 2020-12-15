<script context="module">
  import { apollo } from '../lib/apollo';
  import { gql } from 'apollo-boost';

  const EVERYTHING = gql`{
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
}`;

  export async function preload(page, session) {
    const { token } = session;
    if (!token) {
      return this.redirect(302, "login");
    }

    const client = apollo(token);

    try {
      return {
        cache: await client.query({
          query: EVERYTHING,
        }),
      };
    } catch (e) {
      console.error(e);
      return this.redirect(302, "logout");
    }
  }
</script>

<script lang="ts">
// https://github.com/CorfitzMe/sapper-w-svelte-apollo/blob/master/src/routes/index.svelte
import { query, restore } from "svelte-apollo";

export let cache;

restore(EVERYTHING, { data: cache.data });
const customers = query(EVERYTHING, {});

import Customers from "../components/customers/Customers.svelte";
</script>

<svelte:head>
  <title>Customers</title>
</svelte:head>

{#await $customers}
  <p>Loading...</p>
{:then result}
  {#if result.data}
    <Customers customers="{result.data.customers}" />
  {:else}
    <p>ERROR!!</p>
  {/if}
{/await}
