<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CustomerGroupDetail from '../pages/CustomerGroupDetail.svelte';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';

    const client = apollo(true);

    setupLocales();
</script>

<Meta title="Components/Customer Group/Detail" component={CustomerGroupDetail} argTypes={{}} />

<Template let:args>
    <CustomerGroupDetail {...args} />
</Template>

<Story name="Detail" />
