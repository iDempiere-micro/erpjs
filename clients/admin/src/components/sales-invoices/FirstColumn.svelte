<script lang="ts">
    import { salesInvoiceService } from '../../lib/core';
    import type { SalesInvoiceRow } from '../../lib/model/salesInvoice';

    export let row: SalesInvoiceRow;

    const download = (id: number) =>
        process.env.API_BASE_URL &&
        (window as any).token &&
        salesInvoiceService.downloadInvoice(
            process.env.API_BASE_URL,
            (window as any).token || '',
            id,
        );
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            <a
                on:click={() => download(row.id)}
                class="font-medium text-indigo-600 hover:text-indigo-500"
            >
                {row.documentNo}
            </a>
        </div>
        <div class="text-sm text-gray-500">
            {row.grandTotalAccountingSchemeCurrency}
        </div>
    </div>
</div>
