<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

    import { setupLocales } from '../i18n';
    import CustomerGroupDetail from '../components/customerGroup-detail/CustomerGroupDetail.svelte';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta title="Components/Customer Group/Detail" component={CustomerGroupDetail} argTypes={{}} />

<Template let:args>
    <CustomerGroupDetail {...args} />
</Template>

<Story name="Detail" />
