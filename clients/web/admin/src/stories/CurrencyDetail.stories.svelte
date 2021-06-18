<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CurrencyDetail from '../components/currency-detail/CurrencyDetail.svelte';
    import { setupLocales } from '../i18n';
    import {apollo, setClient} from "@eolerp/common";
    import {mock} from "../lib/queries/currencies";
    import {mocks} from "../lib/support/mocks";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta title="Components/Currency/Detail" component={CurrencyDetail} argTypes={{}} />

<Template let:args>
    <CurrencyDetail {...args} currency={mock.data.currencies[0]} />
</Template>

<Story name="Detail" />
