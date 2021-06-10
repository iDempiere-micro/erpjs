<script lang="ts">
    import { attachmentService } from '../lib/core';
    import AddOrEditAttachment from '../components/add-attachment/AddOrEditAttachment.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    export let params: any = {};
    const id = parseInt('' + params.id);

    attachmentService.load(id);

    const store = attachmentService.stores.detail;
</script>

<Page
    title={$_('page.attachments.edit.title')}
    segment={segments.attachments}
    name="page.attachments.edit"
>
    <span slot="content">
        {#if $store.loaded}
            <AddOrEditAttachment attachment={$store.data} />
        {:else}
            {$_('status.loading')}
        {/if}
    </span>
</Page>
