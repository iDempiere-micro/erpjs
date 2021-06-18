<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import CountryDetail from '../components/country-detail/CountryDetail.svelte';
    import { setupLocales } from '../i18n';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";
    import {mock} from "../lib/queries/countries";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta title="Components/Country/Detail" component={CountryDetail} argTypes={{}} />

<Template let:args>
    <CountryDetail {...args} data={mock.data.countries[0]} />
</Template>

<Story name="Detail" />
