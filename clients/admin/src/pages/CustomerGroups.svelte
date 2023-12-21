<script lang="ts">
    import CustomerGroupList from '../components/customerGroups/CustomerGroupList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { customerGroupService } from '../lib/core';

    customerGroupService.loadList();
    const customerGroups = customerGroupService.stores.list;
</script>

<Page
    segment={segments.customerGroups}
    name="page.customerGroups"
    title={$_('page.customerGroups.title')}
>
    <span slot="content">
        {#if $customerGroups.loaded}
            <CustomerGroupList customerGroups={$customerGroups.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.customerGroups.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.customerGroups.add.title')}</a
        >
    </span>
</Page>
