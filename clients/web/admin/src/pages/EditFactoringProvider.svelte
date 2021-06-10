<script lang="ts">
    import { factoringProviderService } from '../lib/core';
    import AddOrEditFactoringProvider from '../components/add-factoringProvider/AddOrEditFactoringProvider.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);
    factoringProviderService.load(id);

    const factoringProvider = factoringProviderService.stores.detail;
</script>

<Page
    title={$_('page.factoringProviders.edit.title')}
    segment={segments.factoringProviders}
    name="page.factoringProviders.edit"
>
    <span slot="content">
        {#if $factoringProvider.loaded}
            <AddOrEditFactoringProvider factoringProvider={$factoringProvider.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
