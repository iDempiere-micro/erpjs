<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AddOrEditCustomerGroup from '../components/add-customerGroup/AddOrEditCustomerGroup.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock1 } from '../lib/queries/customerGroup';

    setClient(apollo({ forceMock: true }));
    setupLocales();
</script>

<Meta title="Components/Customer Group/Add&Edit" component={AddOrEditCustomerGroup} argTypes={{}} />

<Template let:args>
    <AddOrEditCustomerGroup {...args} />
</Template>

<Story name="Add" />
<Story
    name="Edit"
    args={{
        customerGroup: mock1.data.customerGroup,
    }}
/>
