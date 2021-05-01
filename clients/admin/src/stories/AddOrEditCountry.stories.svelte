<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AddOrEditCountry from '../components/add-country/AddOrEditCountry.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/countries';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Country/Add&Edit" component={AddOrEditCountry} argTypes={{}} />

<Template let:args>
    <AddOrEditCountry {...args} />
</Template>

<Story name="Add" />
<Story
    name="Edit"
    args={{
        country: mock.data.countries[0],
    }}
/>
