<script lang="ts">
    import type { FactoringProvidersQuery } from '../generated/graphql';
    import { getError } from '../lib/support/util';
    import FactoringProviderList from '../components/factoringProviders/FactoringProviderList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { FACTORING_PROVIDERS } from '../lib/queries/factoringProviders';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { query } from '../absorb/svelte-apollo';

    const factoringProviders = query<FactoringProvidersQuery, any>(FACTORING_PROVIDERS);
</script>

<Page
    title={$_('page.factoringProviders.title')}
    segment={segments.factoringProviders}
    name="page.factoringProviders"
>
    <span slot="content">
        {#if $factoringProviders.loading}
            {$_('status.loading')}
        {:else if $factoringProviders.error}
            {$_('status.error')} {getError($factoringProviders.error)}
        {:else}
            <FactoringProviderList
                factoringProviders={$factoringProviders.data?.factoringProviders}
            />
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.factoringProviders.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.factoringProviders.add.title')}</a
        >
    </span>
</Page>
