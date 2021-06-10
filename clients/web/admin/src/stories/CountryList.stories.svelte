<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CountryList from '../components/countries/CountryList.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/countries';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Country/List" component={CountryList} argTypes={{}} />

<Template let:args>
    <CountryList {...args} />
</Template>

<Story name="List" args={{ countries: mock.data.countries }} />
