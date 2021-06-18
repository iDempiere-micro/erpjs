<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { setupLocales } from '../i18n';
    import CustomerDetail from '../components/customer-detail/CustomerDetail.svelte';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta title="Components/Customer/Detail" component={CustomerDetail} argTypes={{}} />

<Template let:args>
    <CustomerDetail {...args} />
</Template>

<Story name="Detail" />
