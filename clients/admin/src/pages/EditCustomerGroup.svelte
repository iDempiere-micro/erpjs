<script lang="ts">
    import { getCustomerGroupBy } from '../lib/core/customerGroup';
    import AddOrEditCustomerGroup from '../components/add-customerGroup/AddOrEditCustomerGroup.svelte';
    import { segments } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const CustomerGroup = getCustomerGroupBy(id);
</script>

<Page
    title={$_('page.customerGroups.edit.title')}
    segment={segments.customerGroups}
    name="page.customerGroups.edit"
>
    <span slot="content">
        {#if $CustomerGroup.loading}
            {$_('status.loading')}
        {:else if $CustomerGroup.error}
            {$_('status.error')} {getError($CustomerGroup.error)}
        {:else if $CustomerGroup?.data?.customerGroup}
            <AddOrEditCustomerGroup customerGroup={$CustomerGroup?.data?.customerGroup} />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
