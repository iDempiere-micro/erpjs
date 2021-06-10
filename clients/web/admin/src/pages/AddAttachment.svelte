<script lang="ts">
    import AddOrEditAttachment from '../components/add-attachment/AddOrEditAttachment.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
</script>

<Page
    title={$_('page.attachments.add.title')}
    segment={segments.attachments}
    name="page.attachments.add.title"
>
    <span slot="content">
        <AddOrEditAttachment attachment={undefined} />
    </span>
</Page>
