<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

    import { setupLocales } from '../i18n';
    import FactoringContractDetail from '../components/factoringContract-detail/FactoringContractDetail.svelte';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta
    title="Components/Factoring Contract/Detail"
    component={FactoringContractDetail}
    argTypes={{}}
/>

<Template let:args>
    <FactoringContractDetail {...args} />
</Template>

<Story name="Detail" />
