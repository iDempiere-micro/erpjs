<script lang="ts">
    import { apollo, setClient } from '../lib/support/apollo';
    import AddOrEditFactoringProvider from '../components/add-factoringProvider/AddOrEditFactoringProvider.svelte';
    import { segments, urls } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';

    const client = apollo(urls.factoringProviders.add);
    setClient(client);
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
