<script lang="ts">
    import AddOrEditFactoringProvider from '../components/add-factoringProvider/AddOrEditFactoringProvider.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
</script>

<Page
    title={$_('page.factoringProviders.add.title')}
    segment={segments.factoringProviders}
    name="page.factoringProviders.add.title"
>
    <span slot="content">
        <AddOrEditFactoringProvider factoringProvider={undefined} />
    </span>
</Page>
