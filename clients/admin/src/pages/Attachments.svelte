<script lang="ts">
    import AttachmentList from '../components/attachments/AttachmentList.svelte';
    import { segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { attachmentService } from '../lib/core';

    attachmentService.loadList();

    const attachments = attachmentService.stores.list;
</script>

<Page segment={segments.attachments} name="page.attachments" title={$_('page.attachments.title')}>
    <span slot="content">
        {#if $attachments.loaded}
            <AttachmentList attachments={$attachments.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
    <span slot="header">
        <a
            href="#/{urls.attachments.add}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.attachments.add.title')}</a
        >
    </span>
</Page>
