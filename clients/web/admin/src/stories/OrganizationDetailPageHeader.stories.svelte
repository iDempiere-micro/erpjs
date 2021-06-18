<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { setupLocales } from '../i18n';
    import OrganizationDetailPageHeader from '../components/organization-detail/OrganizationDetailPageHeader.svelte';
    import { mock } from '../lib/queries/organization';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta
    title="Components/Organization/Header"
    component={OrganizationDetailPageHeader}
    argTypes={{}}
/>

<Template let:args>
    <OrganizationDetailPageHeader {...args} />
</Template>

<Story name="Empty" />
<Story
    name="Organization Provided"
    args={{
        organization: mock.data,
    }}
/>
<Story
    name="Id Provided"
    args={{
        id: mock.data.id,
    }}
/>
