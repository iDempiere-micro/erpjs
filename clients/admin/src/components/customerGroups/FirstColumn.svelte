<script lang="ts">
    import type { CustomerGroupRow } from '../../lib/model/customerGroup';

    export let row: CustomerGroupRow;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.displayName}
        </div>
        <div class="text-sm text-gray-500" />
    </div>
</div>
