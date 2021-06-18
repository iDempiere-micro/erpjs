<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CustomerGroupList from '../components/customerGroups/CustomerGroupList.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/customerGroups';

    setClient(apollo({ forceMock: true }));
    setupLocales();
</script>

<Meta title="Components/Customer Group/List" component={CustomerGroupList} argTypes={{}} />

<Template let:args>
    <CustomerGroupList {...args} />
</Template>

<Story name="List" args={{ customerGroups: mock.data.customerGroups }} />
