<script lang="ts">
    import type { FactoringContractDetail } from '../../lib/model/factoringContract';
    import { factoringContractService } from '../../lib/core';
    import { _ } from 'svelte-i18n';

    export let factoringContract: FactoringContractDetail = factoringContractService.getDetailSafeEntity();
</script>

<div class="border-t border-gray-200">
    <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
                {$_('page.factoringContracts.detail.factoringProvider')}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {factoringContract.factoringProvider.displayName}
            </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
                {$_('page.factoringContracts.detail.invoicePrintNote')}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {factoringContract.invoicePrintNote}
            </dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
                {$_('page.factoringContracts.detail.customer')}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {factoringContract.customer.displayName}
            </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
                {$_('page.factoringContracts.detail.organization')}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {factoringContract.organization.displayName}
            </dd>
        </div>
    </dl>
</div>
