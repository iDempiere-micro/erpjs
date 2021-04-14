<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditBank from '../components/add-bank/AddOrEditBank.svelte';
    import { urls } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';

    const client = apollo(urls.banks.add);
    setClient(client);
</script>

<Page title={$_('page.banks.add.title')} segment={segments.banks} name="page.banks.add.title">
    <span slot="content">
        <AddOrEditBank bank={undefined} />
    </span>
</Page>
