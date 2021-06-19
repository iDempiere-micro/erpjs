<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CustomerSelect from '../components/customers/CustomerSelect.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/customers';

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    setupLocales();

    const defaultArgs = {
        onSelect: (customerId) => {
            console.log('onSelect', customerId);
        },
        id: 'customerId',
        label: 'Customer',
        customerId: mock.data.customers[0].id,
    };
    const requiredError = {
        form: {
            fields: {
                customerId: {
                    errors: ['required'],
                },
            },
        },
    };
</script>

<Meta title="Components/Customer/Select" component={CustomerSelect} argTypes={{}} />

<Template let:args>
    <CustomerSelect {...args} />
</Template>

<Story name="Select" args={defaultArgs} />
