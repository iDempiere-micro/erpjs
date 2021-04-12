<script lang="ts">
    import type { OrganizationListPartsFragment } from '../../generated/graphql';
    export let row: OrganizationListPartsFragment;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.displayName}
        </div>
        <div class="text-sm text-gray-500">
            {row.legalName}
        </div>
    </div>
</div>
