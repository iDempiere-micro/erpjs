<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CustomerGroupDetail from '../pages/CustomerGroupDetail.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';

    const client = apollo('', true);
    setClient(client);
    setupLocales();
</script>

<Meta title="Components/Customer Group/Detail" component={CustomerGroupDetail} argTypes={{}} />

<Template let:args>
    <CustomerGroupDetail {...args} {client} />
</Template>

<Story name="Detail" />
