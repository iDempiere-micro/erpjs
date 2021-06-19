<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CurrencyList from '../components/currencies/CurrencyList.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/currencies';

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    setupLocales();
</script>

<Meta title="Components/Currency/List" component={CurrencyList} argTypes={{}} />

<Template let:args>
    <CurrencyList {...args} />
</Template>

<Story name="List" args={{ currencies: mock.data.currencies }} />
