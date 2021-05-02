<script lang="ts">
    import { accountingSchemeService } from '../lib/core';
    import { push, segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import Button from '../dsl/Button.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    accountingSchemeService.load(id);
    const store = accountingSchemeService.stores.detail;

    const editAccountingScheme = () => push(urls.accountingSchemes.edit, id);
</script>

<Page
    segment={segments.accountingSchemes}
    name="page.accountingScheme.detail"
    title={$_('page.accountingSchemes.detail.title')}
>
    <span slot="content">
        {#if $store.loaded}
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.accountingSchemes.detail.info')}
                    </h3>
                </div>
                <div class="border-t border-gray-200">
                    <dl>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.accountingSchemes.detail.displayName')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {$store.data.displayName}
                            </dd>
                        </div>
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.accountingSchemes.detail.currency')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {$store.data.currency.displayName}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div class="px-4 py-3 bg-white text-right sm:px-6">
                    <Button
                        label={$_('actions.edit')}
                        on:click={() => {
                            editAccountingScheme();
                        }}
                    />
                </div>
            </div>
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
