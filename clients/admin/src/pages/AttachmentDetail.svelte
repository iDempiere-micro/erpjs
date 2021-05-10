<script lang="ts">
    import { attachmentService } from '../lib/core';
    import { push, segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import Button from '../dsl/Button.svelte';
    import AttachmentDetail from '../components/attachment-detail/AttachmentDetail.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    attachmentService.load(id);
    const store = attachmentService.stores.detail;

    const editAttachment = () => push(urls.attachments.edit, id);
</script>

<Page
    segment={segments.attachments}
    name="page.attachment.detail"
    title={$_('page.attachments.detail.title')}
>
    <span slot="content">
        {#if $store.loaded}
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {$_('page.attachments.detail.info')}
                    </h3>
                </div>
                <AttachmentDetail data={$store.data} />
                <div class="px-4 py-3 bg-white text-right sm:px-6">
                    <Button
                        label={$_('actions.edit')}
                        on:click={() => {
                            editAttachment();
                        }}
                    />
                </div>
            </div>
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
