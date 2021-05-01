<script lang="ts">
    import { apollo, setClient } from '../lib/support/apollo';
    import { getOrganizationBy } from '../lib/core/organization';
    import AddOrEditOrganization from '../components/add-organization/AddOrEditOrganization.svelte';
    import { segments, urls } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.organizations.edit + +id);
    setClient(client);

    const organization = getOrganizationBy(id);
</script>

<Page
    title={$_('page.organizations.edit.title')}
    segment={segments.organizations}
    name="page.organizations.edit"
>
    <span slot="content">
        {#if $organization.loading}
            {$_('status.loading')}
        {:else if $organization.error}
            {$_('status.error')} {getError($organization.error)}
        {:else if $organization?.data?.organization}
            <AddOrEditOrganization organization={$organization?.data?.organization} />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
