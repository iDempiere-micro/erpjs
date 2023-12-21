<script lang="ts">
    import type { SalesInvoiceLineSaveArgs } from '../../generated/graphql';

    export let row: SalesInvoiceLineSaveArgs;
    let value = row.linePrice;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <input
            type="text"
            class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
            autocomplete="disabled"
            bind:value
            on:blur|preventDefault={() => (row.linePrice = +value)}
        />
    </div>
</div>
