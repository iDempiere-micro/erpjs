<script lang="ts">
    import { accountingSchemeService } from '../lib/core';
    import { push, segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import Button from '../dsl/Button.svelte';
    import AccountingSchemeDetail from '../components/accountingScheme-detail/AccountingSchemeDetail.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    accountingSchemeService.load(id);
    const store = accountingSchemeService.stores.detail;

    const editAccountingScheme = () => push(urls.accountingSchemes.edit, id);
</script>

<Page
    segment={segments.accountingSchemes}
    name="page.accountingScheme.detail"
    title={$_('page.accountingSchemes.detail.title')}
>
    <span slot="content">
        {#if $store.loaded}
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.accountingSchemes.detail.info')}
                    </h3>
                </div>
                <AccountingSchemeDetail data={$store.data} />
                <div class="px-4 py-3 bg-white text-right sm:px-6">
                    <Button
                        label={$_('actions.edit')}
                        on:click={() => {
                            editAccountingScheme();
                        }}
                    />
                </div>
            </div>
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
