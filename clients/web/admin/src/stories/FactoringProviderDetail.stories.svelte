<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import FactoringProviderDetail from '../components/factoringProvider-detail/FactoringProviderDetail.svelte';

    const client = apollo(true);

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
