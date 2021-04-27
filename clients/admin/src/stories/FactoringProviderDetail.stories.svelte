<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import FactoringProviderDetail from '../pages/FactoringProviderDetail.svelte';
    import { apollo, setClient } from '../lib/apollo';
    import { setupLocales } from '../i18n';
    import { mock1 } from '../lib/queries/factoringProvider';

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
