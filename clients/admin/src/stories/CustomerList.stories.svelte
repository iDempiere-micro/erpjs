<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CustomerList from '../components/customers/CustomerList.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/customers';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Customer/List" component={CustomerList} argTypes={{}} />

<Template let:args>
    <CustomerList {...args} />
</Template>

<Story name="List" args={{ customers: mock.data.customers }} />
