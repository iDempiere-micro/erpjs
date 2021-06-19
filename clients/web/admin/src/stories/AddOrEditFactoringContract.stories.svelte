<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AddOrEditFactoringContract from '../components/add-factoringContract/AddOrEditFactoringContract.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock1 } from '../lib/queries/factoringContract';

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    setupLocales();
</script>

<Meta
    title="Components/Factoring Contract/Add&Edit"
    component={AddOrEditFactoringContract}
    argTypes={{}}
/>

<Template let:args>
    <AddOrEditFactoringContract {...args} />
</Template>

<Story name="Add" />
<Story
    name="Edit"
    args={{
        factoringContract: mock1.data.factoringContract,
    }}
/>
