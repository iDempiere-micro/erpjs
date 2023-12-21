<script lang="ts">
    import { organizationService } from '../lib/core';
    import AddOrEditOrganization from '../components/add-organization/AddOrEditOrganization.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);
    organizationService.load(id);

    const organization = organizationService.stores.detail;
</script>

<Page
    title={$_('page.organizations.edit.title')}
    segment={segments.organizations}
    name="page.organizations.edit"
>
    <span slot="content">
        {#if $organization.loaded}
            <AddOrEditOrganization organization={$organization.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
