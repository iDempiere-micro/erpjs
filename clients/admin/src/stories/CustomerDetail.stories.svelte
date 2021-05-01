<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CustomerDetail from '../pages/CustomerDetail.svelte';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';

    const client = apollo(true);

    setupLocales();
</script>

<Meta title="Components/Customer/Detail" component={CustomerDetail} argTypes={{}} />

<Template let:args>
    <CustomerDetail {...args} />
</Template>

<Story name="Detail" />
