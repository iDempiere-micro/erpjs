<script lang="ts">
    import { _ } from 'svelte-i18n';
    import type { FactoringProviderDetail } from '../../lib/model/factoringProvider';
    import { factoringProviderService } from '../../lib/core';

    export let factoringProvider: FactoringProviderDetail = factoringProviderService.getDetailSafeEntity();
</script>

<div class="border-t border-gray-200">
    <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
                {$_('page.factoringProviders.detail.displayName')}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {factoringProvider.displayName}
            </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
                {$_('page.factoringProviders.detail.legalName')}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {factoringProvider.legalName}
            </dd>
        </div>
    </dl>
</div>
