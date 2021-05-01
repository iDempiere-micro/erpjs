<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import FactoringProviderDetail from '../pages/FactoringProviderDetail.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';

    const client = apollo('', true);
    setClient(client);
    setupLocales();
</script>

<Meta
    title="Components/Factoring Provider/Detail"
    component={FactoringProviderDetail}
    argTypes={{}}
/>

<Template let:args>
    <FactoringProviderDetail {...args} {client} />
</Template>

<Story name="Detail" />
