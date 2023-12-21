<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import CustomerDetail from '../components/customer-detail/CustomerDetail.svelte';

    const client = apollo(true);

    setupLocales();
</script>

<Meta title="Components/Customer/Detail" component={CustomerDetail} argTypes={{}} />

<Template let:args>
    <CustomerDetail {...args} />
</Template>

<Story name="Detail" />
