<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import OrganizationList from '../components/organizations/OrganizationList.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/organizations';

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    setupLocales();
</script>

<Meta title="Components/Organization/List" component={OrganizationList} argTypes={{}} />

<Template let:args>
    <OrganizationList {...args} />
</Template>

<Story name="List" args={{ organizations: mock.data.organizations }} />
