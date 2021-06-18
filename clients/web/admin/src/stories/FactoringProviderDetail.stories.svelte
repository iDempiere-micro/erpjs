<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

    import { setupLocales } from '../i18n';
    import FactoringProviderDetail from '../components/factoringProvider-detail/FactoringProviderDetail.svelte';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta
    title="Components/Factoring Provider/Detail"
    component={FactoringProviderDetail}
    argTypes={{}}
/>

<Template let:args>
    <FactoringProviderDetail {...args} />
</Template>

<Story name="Detail" />
