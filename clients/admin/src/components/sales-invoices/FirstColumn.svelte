<script lang="ts">
    import type { SalesInvoice } from '../../generated/graphql';
    export let row: SalesInvoice;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.documentNo}
        </div>
        <div class="text-sm text-gray-500">
            {row.grandTotalAccountingSchemeCurrency}
        </div>
    </div>
</div>
