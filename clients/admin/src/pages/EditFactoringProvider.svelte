<script lang="ts">
    import { apollo, setClient } from '../lib/support/apollo';
    import { getFactoringProviderBy } from '../lib/core/factoringProvider';
    import AddOrEditFactoringProvider from '../components/add-factoringProvider/AddOrEditFactoringProvider.svelte';
    import { segments, urls } from './pathAndSegment';
    import { getError } from '../lib/support/util';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    const client = apollo(urls.factoringProviders.edit + +id);
    setClient(client);

    const factoringProvider = getFactoringProviderBy(id);
</script>

<Page
    title={$_('page.factoringProviders.edit.title')}
    segment={segments.factoringProviders}
    name="page.factoringProviders.edit"
>
    <span slot="content">
        {#if $factoringProvider.loading}
            {$_('status.loading')}
        {:else if $factoringProvider.error}
            {$_('status.error')} {getError($factoringProvider.error)}
        {:else if $factoringProvider?.data?.factoringProvider}
            <AddOrEditFactoringProvider
                factoringProvider={$factoringProvider?.data?.factoringProvider}
            />
        {:else}
            {$_('status.error')}
        {/if}
    </span>
</Page>
