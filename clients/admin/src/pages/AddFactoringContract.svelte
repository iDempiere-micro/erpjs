<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditFactoringContract from '../components/add-factoringContract/AddOrEditFactoringContract.svelte';
    import { urls } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';

    const client = apollo(urls.factoringContracts.add);
    setClient(client);
</script>

<Page
    title={$_('page.factoringContracts.add.title')}
    segment={segments.factoringContracts}
    name="page.factoringContracts.add.title"
>
    <span slot="content">
        <AddOrEditFactoringContract factoringContract={undefined} />
    </span>
</Page>
