<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import OrganizationList from '../components/organizations/OrganizationList.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/organizations';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Organization/List" component={OrganizationList} argTypes={{}} />

<Template let:args>
    <OrganizationList {...args} />
</Template>

<Story name="List" args={{ organizations: mock.data.organizations }} />
