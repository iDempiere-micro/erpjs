<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AddOrEditBank from '../components/add-bank/AddOrEditBank.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/banks';

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    setupLocales();
</script>

<Meta title="Components/Bank/Add&Edit" component={AddOrEditBank} argTypes={{}} />

<Template let:args>
    <AddOrEditBank {...args} />
</Template>

<Story name="Add" />
<Story
    name="Edit"
    args={{
        bank: mock.data.banks[0],
    }}
/>
