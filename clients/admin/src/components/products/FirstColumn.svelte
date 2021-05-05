<script lang="ts">
    import type { ProductRow } from '../../lib/model/product';

    export let row: ProductRow;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.displayName}
        </div>
        <div class="text-sm text-gray-500">
            {row.sku}
        </div>
    </div>
</div>
