<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import FactoringContractDetail from '../pages/FactoringContractDetail.svelte';
    import { apollo, setClient } from '../lib/apollo';
    import { setupLocales } from '../i18n';

    const client = apollo('', true);
    setClient(client);
    setupLocales();
</script>

<Meta
    title="Components/Factoring Contract/Detail"
    component={FactoringContractDetail}
    argTypes={{}}
/>

<Template let:args>
    <FactoringContractDetail {...args} {client} />
</Template>

<Story name="Detail" />
