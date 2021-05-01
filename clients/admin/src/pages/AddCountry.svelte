<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditCountry from '../components/add-country/AddOrEditCountry.svelte';
    import { segments, urls } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';

    const client = apollo(urls.countries.add);
    setClient(client);
</script>

<Page
    title={$_('page.countries.add.title')}
    segment={segments.countries}
    name="page.countries.add.title"
>
    <span slot="content">
        <AddOrEditCountry country={undefined} />
    </span>
</Page>
