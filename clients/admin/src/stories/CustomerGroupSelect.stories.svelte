<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CustomerGroupSelect from '../components/customerGroups/CustomerGroupSelect.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/customerGroups';

    setClient(apollo(true));
    setupLocales();

    const defaultArgs = {
        onSelect: (customerGroupId) => {
            console.log('onSelect', customerGroupId);
        },
        id: 'customerGroupId',
        label: 'Accounting Scheme',
        customerGroupId: mock.data.customerGroups[0].id,
    };
    const requiredError = {
        form: {
            fields: {
                customerGroupId: {
                    errors: ['required'],
                },
            },
        },
    };
</script>

<Meta title="Components/Customer Group/Select" component={CustomerGroupSelect} argTypes={{}} />

<Template let:args>
    <CustomerGroupSelect {...args} />
</Template>

<Story name="Select" args={defaultArgs} />
