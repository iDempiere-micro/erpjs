<script lang="ts">
    import { factoringProviderService } from '../lib/core';
    import { push, segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import Button from '../dsl/Button.svelte';
    import FactoringProviderDetail from '../components/factoringProvider-detail/FactoringProviderDetail.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);
    factoringProviderService.load(id);

    const factoringProvider = factoringProviderService.stores.detail;

    const editFactoringProvider = () => push(urls.factoringProviders.edit, id);
</script>

<Page
    segment={segments.factoringProviders}
    name="page.factoringProvider.detail"
    title={$_('page.factoringProviders.detail.title')}
>
    <span slot="content">
        {#if $factoringProvider.loaded}
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.factoringProviders.detail.info')}
                    </h3>
                </div>

                <FactoringProviderDetail factoringProvider={$factoringProvider.data} />

                <div class="px-4 py-3 bg-white text-right sm:px-6">
                    <Button
                        label={$_('actions.edit')}
                        on:click={() => {
                            editFactoringProvider();
                        }}
                    />
                </div>
            </div>
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
