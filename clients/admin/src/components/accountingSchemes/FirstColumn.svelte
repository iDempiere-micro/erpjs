<script lang="ts">
    import type { AccountingSchemeListPartsFragment } from '../../generated/graphql';

    export let row: AccountingSchemeListPartsFragment;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.displayName}
        </div>
        <div class="text-sm text-gray-500">
            {row.currency.displayName}
        </div>
    </div>
</div>
