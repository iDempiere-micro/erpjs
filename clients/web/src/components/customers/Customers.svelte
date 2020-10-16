<script lang="ts">
import type { CustomerDetailPartsFragment } from "../../generated/graphql";

export let customers: CustomerDetailPartsFragment[];
</script>

{#each customers as customer}
  <li>
    <p><strong>ID: {customer.id}</strong></p>
    <p><strong>ID: {customer.legalName}</strong></p>
  </li>
{/each}
