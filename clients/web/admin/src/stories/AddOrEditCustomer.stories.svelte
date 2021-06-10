<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AddOrEditCustomer from '../components/add-customer/AddOrEditCustomer.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/customer';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Customer/Add&Edit" component={AddOrEditCustomer} argTypes={{}} />

<Template let:args>
    <AddOrEditCustomer {...args} />
</Template>

<Story name="Add" />
<Story
    name="Edit"
    args={{
        customer: mock.data.customer,
    }}
/>
