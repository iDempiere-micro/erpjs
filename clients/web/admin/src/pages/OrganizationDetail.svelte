<script lang="ts">
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import OrganizationDetail from '../components/organization-detail/OrganizationDetail.svelte';
    import { organizationService } from '../lib/core';
    import OrganizationDetailPageHeader from '../components/organization-detail/OrganizationDetailPageHeader.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    organizationService.load(id);
    const organization = organizationService.stores.detail;
</script>

<Page segment={segments.organizations} name="page.organization.detail">
    <span slot="content">
        {#if $organization.loaded}
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <OrganizationDetail organization={$organization.data} />
            </div>
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
    <span slot="header">
        {#if $organization.loaded}
            <OrganizationDetailPageHeader
                organization={$organization.data}
                id={$organization.data.id}
            />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
