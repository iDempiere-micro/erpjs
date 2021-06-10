<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import FactoringProviderList from '../components/factoringProviders/FactoringProviderList.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/factoringProviders';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Factoring Provider/List" component={FactoringProviderList} argTypes={{}} />

<Template let:args>
    <FactoringProviderList {...args} />
</Template>

<Story name="List" args={{ factoringProviders: mock.data.factoringProviders }} />
