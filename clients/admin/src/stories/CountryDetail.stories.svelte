<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CountryDetail from '../components/country-detail/CountryDetail.svelte';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../../build/dist/lib/queries/countries';

    const client = apollo(true);

    setupLocales();
</script>

<Meta title="Components/Country/Detail" component={CountryDetail} argTypes={{}} />

<Template let:args>
    <CountryDetail {...args} data={mock.data.countries[0]} />
</Template>

<Story name="Detail" />
