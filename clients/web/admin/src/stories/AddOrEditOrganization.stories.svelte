<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AddOrEditOrganization from '../components/add-organization/AddOrEditOrganization.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/organization';

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    setupLocales();
</script>

<Meta title="Components/Organization/Add&Edit" component={AddOrEditOrganization} argTypes={{}} />

<Template let:args>
    <AddOrEditOrganization {...args} />
</Template>

<Story name="Add" />
<Story
    name="Edit"
    args={{
        organization: mock.data.organization,
    }}
/>
