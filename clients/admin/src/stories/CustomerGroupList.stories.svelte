<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CustomerGroupList from '../components/customerGroups/CustomerGroupList.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/customerGroups';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Customer Group/List" component={CustomerGroupList} argTypes={{}} />

<Template let:args>
    <CustomerGroupList {...args} />
</Template>

<Story name="List" args={{ customerGroups: mock.data.customerGroups }} />
