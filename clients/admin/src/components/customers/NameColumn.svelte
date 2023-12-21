<script lang="ts">
    import type { CustomerDetail } from '../../lib/model/customer';
    import { customerService } from '../../lib/core';

    export let row: CustomerDetail;
    let customerPhotoContent: string;

    customerService.loadCustomerPhotoContent(row.id).then((data) => {
        customerPhotoContent = data;
    });
</script>

<div class="flex items-center">
    <div class="flex-shrink-0 h-10 w-10">
        {#if customerPhotoContent}
            <img
                class="h-10 w-10 rounded-full"
                src={`data:image/png;base64,${customerPhotoContent}`}
                alt={row.displayName}
            />
        {/if}
    </div>
    <div class="ml-4">
        <div class="text-sm font-medium text-gray-900">
            {row.displayName}
        </div>
        <div class="text-sm text-gray-500">
            {row.legalName}
        </div>
    </div>
</div>
