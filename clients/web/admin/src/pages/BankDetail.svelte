<script lang="ts">
    import { bankService } from '../lib/core';
    import { push, segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import Button from '../dsl/Button.svelte';
    import BankDetail from '../components/bank-detail/BankDetail.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    bankService.load(id);
    const store = bankService.stores.detail;

    const editBank = () => push(urls.banks.edit, id);
</script>

<Page segment={segments.banks} name="page.bank.detail" title={$_('page.banks.detail.title')}>
    <span slot="content">
        {#if $store.loaded}
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.banks.detail.info')}
                    </h3>
                </div>
                <BankDetail data={$store.data} />
                <div class="px-4 py-3 bg-white text-right sm:px-6">
                    <Button
                        label={$_('actions.edit')}
                        on:click={() => {
                            editBank();
                        }}
                    />
                </div>
            </div>
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
