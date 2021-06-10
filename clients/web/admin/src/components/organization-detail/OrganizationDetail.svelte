<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { organizationService } from '../../lib/core';
    import type { OrganizationDetail } from '../../lib/model/organization';
    import { printableString } from '../../lib/support/util';

    export let organization: OrganizationDetail = organizationService.getDetailSafeEntity();
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            {$_('page.organizations.detail.legalInformation')}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            {$_('page.organizations.detail.description.legalInformation')}
        </p>
    </div>
    <div class="border-t border-gray-200">
        <dl>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.organizations.detail.idNumber')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(organization.idNumber)}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.organizations.detail.vatNumber')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(organization.vatNumber)}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.organizations.detail.country')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(organization.legalAddress.country.displayName)}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.organizations.detail.line1')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(organization.legalAddress.line1)}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.organizations.detail.city')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(organization.legalAddress.city)}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.organizations.detail.zip')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(organization.legalAddress.zipCode)}
                </dd>
            </div>
        </dl>
    </div>
</div>
