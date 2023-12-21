<script lang="ts">
    import AddOrEditOrganization from '../components/add-organization/AddOrEditOrganization.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
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
