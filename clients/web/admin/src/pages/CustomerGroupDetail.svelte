<script lang="ts">
    import { customerGroupService } from '../lib/core';
    import { push, segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import Button from '../dsl/Button.svelte';
    import CustomerGroupDetail from '../components/customerGroup-detail/CustomerGroupDetail.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);
    customerGroupService.load(id);
    const customerGroup = customerGroupService.stores.detail;

    const editCustomerGroup = () => push(urls.customerGroups.edit, id);
</script>

<Page
    segment={segments.customerGroups}
    name="page.customerGroup.detail"
    title={$_('page.customerGroups.detail.title')}
>
    <span slot="content">
        {#if $customerGroup.loaded}
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.customerGroups.detail.info')}
                    </h3>
                </div>

                <CustomerGroupDetail customerGroup={$customerGroup.data} />

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
            {$_('status.loading')}
        {/if}
    </span>
</Page>
