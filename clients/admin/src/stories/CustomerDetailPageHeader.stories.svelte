<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import CustomerDetailPageHeader from '../components/customer-detail/CustomerDetailPageHeader.svelte';
    import { mock } from '../lib/queries/customer';

    const client = apollo(true);

    setupLocales();
</script>

<Meta title="Components/Customer/Header" component={CustomerDetailPageHeader} argTypes={{}} />

<Template let:args>
    <CustomerDetailPageHeader {...args} />
</Template>

<Story name="Empty" />
<Story
    name="Customer Provided"
    args={{
        customer: mock.data.customer,
    }}
/>
<Story
    name="Id Provided"
    args={{
        id: mock.data.customer.id,
    }}
/>
