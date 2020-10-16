<script context="module">
// https://github.com/CorfitzMe/sapper-w-svelte-apollo/blob/master/src/routes/index.svelte
import { apollo, gqlQuery } from "../lib/apollo";
import { gql } from "apollo-boost";

const EVERYTHING = gql`
  {
    customers {
      id
      legalName
    }
  }
`;

export async function preload(page, session) {
  return gqlQuery(this, session, EVERYTHING);
}
</script>

<script>
import { resourceUsage } from "process";
import { setClient, restore, query } from "svelte-apollo";
export let cache;
export let token;
const client = apollo(token);
restore(client, EVERYTHING, cache.data);
// TODO Uncommenting this part triggers a 500 error.
// setClient(client);
// query a subset of the preloaded (the rest if for Account)
const customers = query(client, { query: EVERYTHING });

import Customers from "../components/customers/Customers.svelte";
</script>

<svelte:head>
  <title>Customers</title>
</svelte:head>

<h1>Customers</h1>

<p>Customers are shown here</p>

{#await $customers}
  <p>Loading...</p>
{:then result}
  {#if result.data}
    <ul>
      <Customers customers="{result.data.customers}" />
    </ul>
  {:else}
    <p>ERROR!!</p>
  {/if}
{/await}
