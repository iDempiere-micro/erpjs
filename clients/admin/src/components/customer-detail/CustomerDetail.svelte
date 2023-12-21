<script lang="ts">
    import Break from '../../molecules/form/Break.svelte';
    import { _ } from 'svelte-i18n';
    import { customerService } from '../../lib/core';
    import type { CustomerDetail } from '../../lib/model/customer';
    import { printableString } from '../../lib/support/util';

    export let customer: CustomerDetail = customerService.getDetailSafeEntity();
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            {$_('page.customers.detail.internalInformation')}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            {$_('page.customers.detail.description.internalInformation')}
        </p>
    </div>
    <div class="border-t border-gray-200">
        <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.note')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.note)}
                </dd>
            </div>
        </dl>
    </div>
</div>

<Break />

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            {$_('page.customers.detail.legalInformation')}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            {$_('page.customers.detail.description.legalInformation')}
        </p>
    </div>
    <div class="border-t border-gray-200">
        <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.invoicingEmailAddress')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.invoicingEmail)}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.idNumber')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.idNumber)}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.vatNumber')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.vatNumber)}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.country')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.legalAddress.country.displayName)}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.line1')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.legalAddress.line1)}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.city')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.legalAddress.city)}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.zip')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.legalAddress.zipCode)}
                </dd>
            </div>
        </dl>
    </div>
</div>

<Break />

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            {$_('page.customers.detail.publicInformation')}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            {$_('page.customers.detail.description.publicInformation')}
        </p>
    </div>
    <div class="border-t border-gray-200">
        <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.www')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.www)}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.publicNote')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.publicNote)}
                </dd>
            </div>
        </dl>
    </div>
</div>

<Break />

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            {$_('page.customers.detail.contactInformation')}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            {$_('page.customers.detail.description.contactInformation')}
        </p>
    </div>
    <div class="border-t border-gray-200">
        <dl>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.country')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.safeAddress.country.displayName)}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.line1')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.safeAddress.line1)}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.city')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.safeAddress.city)}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.zip')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {printableString(customer.safeAddress.zipCode)}
                </dd>
            </div>
        </dl>
    </div>
</div>

<Break />

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            {$_('page.customers.detail.priceListInformation')}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            {$_('page.customers.detail.description.priceListInformation')}
        </p>
    </div>
    <div class="border-t border-gray-200">
        <dl>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.customers.detail.productPrices')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {#if customer.safeCustomerGroup.customerPriceLists && customer.safeCustomerGroup.customerPriceLists.length > 0}
                            {#each customer.safeCustomerGroup.customerPriceLists[0].productPrices || [] as productPrice}
                                <li
                                    class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                                >
                                    <div class="w-0 flex-1 flex items-center">
                                        <!-- Heroicon name: paper-clip -->
                                        <svg
                                            class="flex-shrink-0 h-5 w-5 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        <span class="ml-2 flex-1 w-0 truncate">
                                            {productPrice.product.displayName}
                                            {productPrice.sellingPrice}
                                            {productPrice.currency.displayName}
                                        </span>
                                    </div>
                                    <div class="ml-4 flex-shrink-0">
                                        <a
                                            href="/"
                                            class="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </li>
                            {/each}
                        {/if}
                    </ul>
                </dd>
            </div>
        </dl>
    </div>
</div>
