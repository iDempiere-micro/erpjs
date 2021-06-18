<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import BankDetail from '../components/bank-detail/BankDetail.svelte';
    import { setupLocales } from '../i18n';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";
    import {mock} from "../lib/queries/banks";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta title="Components/Bank/Detail" component={BankDetail} argTypes={{}} />

<Template let:args>
    <BankDetail {...args} data={mock.data.banks[0]} />
</Template>

<Story name="Detail" />
