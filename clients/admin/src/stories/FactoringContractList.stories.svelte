<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import FactoringContractList from '../components/factoringContracts/FactoringContractList.svelte';
    import { apollo, setClient } from '../lib/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/factoringContracts';

    setClient(apollo('', true));
    setupLocales();
</script>

<Meta title="Components/Accounting Scheme/List" component={FactoringContractList} argTypes={{}} />

<Template let:args>
    <FactoringContractList {...args} />
</Template>

<Story name="List" args={{ factoringContracts: mock.data.factoringContracts }} />
