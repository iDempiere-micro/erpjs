<script lang="ts">
    import { push, segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import Button from '../dsl/Button.svelte';
    import { factoringContractService } from '../lib/core';
    import FactoringContractDetail from '../components/factoringContract-detail/FactoringContractDetail.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);
    factoringContractService.load(id);

    let factoringContract = factoringContractService.stores.detail;

    const editFactoringContract = () => push(urls.factoringContracts.edit, id);
</script>

<Page
    segment={segments.factoringContracts}
    name="page.factoringContract.detail"
    title={$_('page.factoringContracts.detail.title')}
>
    <span slot="content">
        {#if $factoringContract.loaded}
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.factoringContracts.detail.info')}
                    </h3>
                </div>

                <FactoringContractDetail factoringContract={$factoringContract.data} />

                <div class="px-4 py-3 bg-white text-right sm:px-6">
                    <Button
                        label={$_('actions.edit')}
                        on:click={() => {
                            editFactoringContract();
                        }}
                    />
                </div>
            </div>
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
