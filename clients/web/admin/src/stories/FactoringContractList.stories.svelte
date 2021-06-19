<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import FactoringContractList from '../components/factoringContracts/FactoringContractList.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/factoringContracts';

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    setupLocales();
</script>

<Meta title="Components/Factoring Contract/List" component={FactoringContractList} argTypes={{}} />

<Template let:args>
    <FactoringContractList {...args} />
</Template>

<Story name="List" args={{ factoringContracts: mock.data.factoringContracts }} />
