<script lang="ts">
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import FactoringContractSelect from '../components/factoringContracts/FactoringContractSelect.svelte';
    import { apollo, setClient } from '../lib/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/factoringContracts';

    setClient(apollo('', true));
    setupLocales();

    const defaultArgs = {
        onSelect: (factoringContractId) => {
            console.log('onSelect', factoringContractId);
        },
        id: 'factoringContractId',
        label: 'Accounting Scheme',
        factoringContractId: mock.data.factoringContracts[0].id,
    };
    const requiredError = {
        form: {
            fields: {
                factoringContractId: {
                    errors: ['required'],
                },
            },
        },
    };
</script>

<Meta
    title="Components/Accounting Scheme/Select"
    component={FactoringContractSelect}
    argTypes={{}}
/>

<Template let:args>
    <FactoringContractSelect {...args} />
</Template>

<Story name="Select" args={defaultArgs} />
