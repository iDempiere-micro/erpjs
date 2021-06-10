<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CurrencySelect from '../components/currencies/CurrencySelect.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/currencies';

    setClient(apollo(true));
    setupLocales();

    const defaultArgs = {
        onSelect: (currencyId) => {
            console.log('onSelect', currencyId);
        },
        id: 'currencyId',
        label: 'Currency',
        currencyId: mock.data.currencies[0].id,
    };
    const requiredError = {
        form: {
            fields: {
                currencyId: {
                    errors: ['required'],
                },
            },
        },
    };
</script>

<Meta title="Components/Currency/Select" component={CurrencySelect} argTypes={{}} />

<Template let:args>
    <CurrencySelect {...args} />
</Template>

<Story name="Select" args={defaultArgs} />
