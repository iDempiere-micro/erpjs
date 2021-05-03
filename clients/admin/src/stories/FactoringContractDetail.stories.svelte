<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import FactoringContractDetail from '../components/factoringContract-detail/FactoringContractDetail.svelte';

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
