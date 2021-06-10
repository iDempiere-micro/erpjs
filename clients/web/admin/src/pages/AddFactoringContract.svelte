<script lang="ts">
    import AddOrEditFactoringContract from '../components/add-factoringContract/AddOrEditFactoringContract.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
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
