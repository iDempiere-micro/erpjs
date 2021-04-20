<script lang="ts">
    import type { CustomerGroupListPartsFragment } from '../../generated/graphql';
    export let row: CustomerGroupListPartsFragment;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.displayName}
        </div>
        <div class="text-sm text-gray-500" />
    </div>
</div>
