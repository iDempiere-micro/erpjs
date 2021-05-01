<script lang="ts">
    import AddOrEditAccountingScheme from '../components/add-accountingScheme/AddOrEditAccountingScheme.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
</script>

<Page
    title={$_('page.accountingSchemes.add.title')}
    segment={segments.accountingSchemes}
    name="page.accountingSchemes.add.title"
>
    <span slot="content">
        <AddOrEditAccountingScheme accountingScheme={undefined} />
    </span>
</Page>
