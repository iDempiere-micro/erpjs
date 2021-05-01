<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { getAccountingSchemeBy } from '../lib/accountingScheme';
    import { push, segments, urls } from './pathAndSegment';
    import { getError } from '../lib/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
    import type { AccountingSchemeDetailPartsFragment } from '../generated/graphql';
    import Button from '../dsl/Button.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    export let client: ApolloClient<NormalizedCacheObject> = apollo(
        urls.accountingSchemes.detail + id,
    );
    setClient(client);
    let accountingScheme: AccountingSchemeDetailPartsFragment;

    const accountingSchemeResult = getAccountingSchemeBy(id);

    const editAccountingScheme = () => push(urls.accountingSchemes.edit, id);

    $: {
        accountingScheme = $accountingSchemeResult?.data?.accountingScheme || ({} as any);
    }
</script>

<Page
    segment={segments.accountingSchemes}
    name="page.accountingScheme.detail"
    title={$_('page.accountingSchemes.detail.title')}
>
    <span slot="content">
        {#if $accountingSchemeResult.loading}
            {$_('status.loading')}
        {:else if $accountingSchemeResult.error}
            {$_('status.error')} {getError($accountingSchemeResult.error)}
        {:else if $accountingSchemeResult.data}
            <!-- This example requires Tailwind CSS v2.0+ -->
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
                                {accountingScheme.displayName}
                            </dd>
                        </div>
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.accountingSchemes.detail.currency')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {accountingScheme.currency.displayName}
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
            {$_('status.error')}
        {/if}
    </span>
</Page>
