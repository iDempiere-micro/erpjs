<script lang="ts">
    import AddOrEditBank from '../components/add-bank/AddOrEditBank.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
</script>

<Page title={$_('page.banks.add.title')} segment={segments.banks} name="page.banks.add.title">
    <span slot="content">
        <AddOrEditBank bank={undefined} />
    </span>
</Page>
