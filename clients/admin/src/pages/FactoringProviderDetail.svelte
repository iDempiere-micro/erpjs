<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { getFactoringProviderBy } from '../lib/factoringProvider';
    import { push, urls } from './pathAndSegment';
    import { getError } from '../lib/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';
    import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
    import type { FactoringProviderDetailPartsFragment } from '../generated/graphql';
    import Button from '../dsl/Button.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    export let client: ApolloClient<NormalizedCacheObject> = apollo(
        urls.factoringProviders.detail + id,
    );
    setClient(client);
    let FactoringProvider: FactoringProviderDetailPartsFragment;

    const FactoringProviderResult = getFactoringProviderBy(id);

    const editFactoringProvider = () => push(urls.factoringProviders.edit, id);

    $: {
        FactoringProvider = $FactoringProviderResult?.data?.factoringProvider || ({} as any);
    }
</script>

<Page
    segment={segments.factoringProviders}
    name="page.factoringProvider.detail"
    title={$_('page.factoringProviders.detail.title')}
>
    <span slot="content">
        {#if $FactoringProviderResult.loading}
            {$_('status.loading')}
        {:else if $FactoringProviderResult.error}
            {$_('status.error')} {getError($FactoringProviderResult.error)}
        {:else if $FactoringProviderResult.data}
            <!-- This example requires Tailwind CSS v2.0+ -->
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.factoringProviders.detail.info')}
                    </h3>
                </div>
                <div class="border-t border-gray-200">
                    <dl>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.factoringProviders.detail.displayName')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {FactoringProvider.displayName}
                            </dd>
                        </div>
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.factoringProviders.detail.legalName')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {FactoringProvider.legalName}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div class="px-4 py-3 bg-white text-right sm:px-6">
                    <Button
                        label={$_('actions.edit')}
                        on:click={() => {
                            editFactoringProvider();
                        }}
                    />
                </div>
            </div>
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
