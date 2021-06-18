<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { setupLocales } from '../i18n';
    import OrganizationDetail from '../components/organization-detail/OrganizationDetail.svelte';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta title="Components/Organization/Detail" component={OrganizationDetail} argTypes={{}} />

<Template let:args>
    <OrganizationDetail {...args} />
</Template>

<Story name="Detail" />
