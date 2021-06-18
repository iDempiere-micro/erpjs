<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { setupLocales } from '../i18n';
    import CustomerDetailPageHeader from '../components/customer-detail/CustomerDetailPageHeader.svelte';
    import { mock } from '../lib/queries/customer';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

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
