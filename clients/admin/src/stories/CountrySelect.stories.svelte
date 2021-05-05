<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CountrySelect from '../components/countries/CountrySelect.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/countries';

    setClient(apollo(true));
    setupLocales();

    const defaultArgs = {
        onSelect: (countryId) => {
            console.log('onSelect', countryId);
        },
        id: 'countryId',
        label: 'Country',
        countryId: mock.data.countries[0].id,
    };
    const requiredError = {
        form: {
            fields: {
                countryId: {
                    errors: ['required'],
                },
            },
        },
    };
</script>

<Meta title="Components/Country/Select" component={CountrySelect} argTypes={{}} />

<Template let:args>
    <CountrySelect {...args} />
</Template>

<Story name="Select" args={defaultArgs} />
