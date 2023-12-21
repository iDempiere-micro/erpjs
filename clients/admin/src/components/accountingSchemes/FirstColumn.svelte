<script lang="ts">
    import type { AccountingSchemeRow } from '../../lib/model/accountingScheme';

    export let row: AccountingSchemeRow;
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
