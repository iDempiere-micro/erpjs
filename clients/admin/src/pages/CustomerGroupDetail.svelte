<script lang="ts">
    import { getCustomerGroupBy } from '../lib/core/customerGroup';
    import { push, segments, urls } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import type { CustomerGroupDetailPartsFragment } from '../generated/graphql';
    import Button from '../dsl/Button.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    let CustomerGroup: CustomerGroupDetailPartsFragment;

    const CustomerGroupResult = getCustomerGroupBy(id);

    const editCustomerGroup = () => push(urls.customerGroups.edit, id);

    $: {
        CustomerGroup = $CustomerGroupResult?.data?.customerGroup || ({} as any);
    }
</script>

<Page
    segment={segments.customerGroups}
    name="page.customerGroup.detail"
    title={$_('page.customerGroups.detail.title')}
>
    <span slot="content">
        {#if $CustomerGroupResult.loading}
            {$_('status.loading')}
        {:else if $CustomerGroupResult.error}
            {$_('status.error')} {getError($CustomerGroupResult.error)}
        {:else if $CustomerGroupResult.data}
            <!-- This example requires Tailwind CSS v2.0+ -->
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.customerGroups.detail.info')}
                    </h3>
                </div>
                <div class="border-t border-gray-200">
                    <dl>
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.customerGroups.detail.displayName')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {CustomerGroup.displayName}
                            </dd>
                        </div>
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500" />
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
                        </div>
                    </dl>
                </div>
                <div class="px-4 py-3 bg-white text-right sm:px-6">
                    <Button
                        label={$_('actions.edit')}
                        on:click={() => {
                            editCustomerGroup();
                        }}
                    />
                </div>
            </div>
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
