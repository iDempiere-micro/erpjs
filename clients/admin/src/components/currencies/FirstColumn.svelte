<script lang="ts">
    import type { CurrencyRow } from '../../lib/model/currency';

    export let row: CurrencyRow;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.displayName}
        </div>
        <div class="text-sm text-gray-500">
            {row.isoCode}
        </div>
    </div>
</div>
