<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import FactoringContractDetail from '../pages/FactoringContractDetail.svelte';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';

    const client = apollo(true);

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
