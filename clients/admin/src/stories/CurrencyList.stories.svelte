<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CurrencyList from '../components/currencies/CurrencyList.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/currencies';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Currency/List" component={CurrencyList} argTypes={{}} />

<Template let:args>
    <CurrencyList {...args} />
</Template>

<Story name="List" args={{ currencies: mock.data.currencies }} />
