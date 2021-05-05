<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AddOrEditFactoringProvider from '../components/add-factoringProvider/AddOrEditFactoringProvider.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock1 } from '../lib/queries/factoringProvider';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta
    title="Components/Factoring Provider/Add&Edit"
    component={AddOrEditFactoringProvider}
    argTypes={{}}
/>

<Template let:args>
    <AddOrEditFactoringProvider {...args} />
</Template>

<Story name="Add" />
<Story
    name="Edit"
    args={{
        factoringProvider: mock1.data.factoringProvider,
    }}
/>
