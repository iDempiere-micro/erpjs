<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { getFactoringContractBy } from '../lib/factoringContract';
    import { push, urls } from './pathAndSegment';
    import { getError } from '../lib/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';
    import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
    import type { FactoringContractDetailPartsFragment } from '../generated/graphql';
    import Button from '../dsl/Button.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    export let client: ApolloClient<NormalizedCacheObject> = apollo(
        urls.factoringContracts.detail + id,
    );
    setClient(client);
    let factoringContract: FactoringContractDetailPartsFragment;

    const factoringContractResult = getFactoringContractBy(id);

    const editFactoringContract = () => push(urls.factoringContracts.edit, id);

    $: {
        factoringContract = $factoringContractResult?.data?.factoringContract || ({} as any);
    }
</script>

<Page
    segment={segments.factoringContracts}
    name="page.factoringContract.detail"
    title={$_('page.factoringContracts.detail.title')}
>
    <span slot="content">
        {#if $factoringContractResult.loading}
            {$_('status.loading')}
        {:else if $factoringContractResult.error}
            {$_('status.error')} {getError($factoringContractResult.error)}
        {:else if $factoringContractResult.data}
            <!-- This example requires Tailwind CSS v2.0+ -->
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.factoringContracts.detail.info')}
                    </h3>
                </div>
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
                <div class="px-4 py-3 bg-white text-right sm:px-6">
                    <Button
                        label={$_('actions.edit')}
                        on:click={() => {
                            editFactoringContract();
                        }}
                    />
                </div>
            </div>
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
