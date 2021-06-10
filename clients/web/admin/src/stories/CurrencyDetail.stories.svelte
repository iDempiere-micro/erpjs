<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CurrencyDetail from '../components/currency-detail/CurrencyDetail.svelte';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../../build/dist/lib/queries/currencies';

    const client = apollo(true);

    setupLocales();
</script>

<Meta title="Components/Currency/Detail" component={CurrencyDetail} argTypes={{}} />

<Template let:args>
    <CurrencyDetail {...args} currency={mock.data.currencies[0]} />
</Template>

<Story name="Detail" />
