<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import OrganizationDetailPageHeader from '../components/organization-detail/OrganizationDetailPageHeader.svelte';
    import { mock } from '../lib/queries/organization';

    const client = apollo(true);

    setupLocales();
</script>

<Meta
    title="Components/Organization/Header"
    component={OrganizationDetailPageHeader}
    argTypes={{}}
/>

<Template let:args>
    <OrganizationDetailPageHeader {...args} />
</Template>

<Story name="Empty" />
<Story
    name="Organization Provided"
    args={{
        organization: mock.data,
    }}
/>
<Story
    name="Id Provided"
    args={{
        id: mock.data.id,
    }}
/>
