<script lang="ts">
    import type { SalesInvoiceDetail } from '../../lib/model/salesInvoice';
    import { mailService, salesInvoiceService } from '../../lib/core';
    import { _ } from 'svelte-i18n';
    import AttachmentSelect from '../attachments/AttachmentSelect.svelte';
    import Button from '../../dsl/Button.svelte';

    export let data: SalesInvoiceDetail = salesInvoiceService.getDetailSafeEntity();
    const mailSentFrom = mailService.getSentFrom();

    let attachmentIds: string[] = [];

    const onSelectAttachments = (ids: string[]) => {
        attachmentIds = ids;
    };

    const publish = () => salesInvoiceService.publish(data.id, attachmentIds);
</script>

<div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            {$_('page.salesInvoices.publish.internalInformation')}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            {$_('page.salesInvoices.publish.description.internalInformation')}
        </p>
    </div>
    <div class="border-t border-gray-200">
        <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.salesInvoices.publish.sender')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {#if $mailSentFrom.data}
                        {($mailSentFrom.data || {}).mailSentFrom}
                    {/if}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.salesInvoices.publish.recipient')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.organization.displayName}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.salesInvoices.publish.customer')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.customer.displayName}
                </dd>
            </div>
            {#if data.factoringProvider}
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        {$_('page.salesInvoices.publish.factoringProvider')}
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.factoringProvider.displayName}
                    </dd>
                </div>
            {/if}
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.salesInvoices.publish.transactionDate')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.transactionDate}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.salesInvoices.publish.totalLines')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {data.totalLines}
                    {data.currency.displayName}
                    = {data.totalLinesAccountingSchemeCurrency}
                    {data.organization.accountingScheme.currency.displayName}
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    {$_('page.salesInvoices.publish.attachments')}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <AttachmentSelect
                        id="attachments"
                        isMulti={true}
                        onSelectMulti={onSelectAttachments}
                    />
                </dd>
            </div>
            <div class="grid-cols-1">
                <Button on:click={publish} />
            </div>
        </dl>
    </div>
</div>
