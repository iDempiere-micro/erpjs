<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import CustomerGroupDetail from '../components/customerGroup-detail/CustomerGroupDetail.svelte';

    const client = apollo(true);

    setupLocales();
</script>

<Meta title="Components/Customer Group/Detail" component={CustomerGroupDetail} argTypes={{}} />

<Template let:args>
    <CustomerGroupDetail {...args} />
</Template>

<Story name="Detail" />
