<script lang="ts">
    import type { FactoringContractListPartsFragment } from '../../generated/graphql';
    export let row: FactoringContractListPartsFragment;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.customer.displayName}
        </div>
        <div class="text-sm text-gray-500">
            {row.organization.displayName}
        </div>
    </div>
</div>
