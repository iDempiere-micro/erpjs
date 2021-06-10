<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AddOrEditCurrency from '../components/add-currency/AddOrEditCurrency.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/currencies';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Currency/Add&Edit" component={AddOrEditCurrency} argTypes={{}} />

<Template let:args>
    <AddOrEditCurrency {...args} />
</Template>

<Story name="Add" />
<Story
    name="Edit"
    args={{
        currency: mock.data.currencies[0],
    }}
/>
