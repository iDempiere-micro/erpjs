<script lang="ts">
    import type { FactoringContractRow } from '../../lib/model/factoringContract';

    export let row: FactoringContractRow;
</script>

<div class="flex items-center">
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.factoringProvider.displayName}
        </div>
        <div class="text-sm text-gray-500">
            {row.invoicePrintNote}
        </div>
    </div>
</div>
