<script lang="ts">
    import { customerGroupService } from '../lib/core/customerGroup';
    import AddOrEditCustomerGroup from '../components/add-customerGroup/AddOrEditCustomerGroup.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);
    customerGroupService.load(id);

    const CustomerGroup = customerGroupService.stores.detail;
</script>

<Page
    title={$_('page.customerGroups.edit.title')}
    segment={segments.customerGroups}
    name="page.customerGroups.edit"
>
    <span slot="content">
        {#if $CustomerGroup.loaded}
            <AddOrEditCustomerGroup customerGroup={$CustomerGroup?.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
