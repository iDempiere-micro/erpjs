<script lang="ts">
    import AddOrEditCountry from '../components/add-country/AddOrEditCountry.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
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
