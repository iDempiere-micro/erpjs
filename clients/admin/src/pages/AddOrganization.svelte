<script lang="ts">
    import { apollo, setClient } from '../lib/support/apollo';
    import AddOrEditOrganization from '../components/add-organization/AddOrEditOrganization.svelte';
    import { segments, urls } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';

    const client = apollo(urls.organizations.add);
    setClient(client);
</script>

<Page
    title={$_('page.organizations.add.title')}
    segment={segments.organizations}
    name="page.organizations.add.title"
>
    <span slot="content">
        <AddOrEditOrganization organization={undefined} />
    </span>
</Page>
