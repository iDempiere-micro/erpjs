<script lang="ts">
    import type { ProductListPartsFragment } from '../../generated/graphql';

    export let row: ProductListPartsFragment;
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
