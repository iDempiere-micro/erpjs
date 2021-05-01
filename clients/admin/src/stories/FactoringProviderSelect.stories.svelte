<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import FactoringProviderSelect from '../components/factoringProviders/FactoringProviderSelect.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/factoringProviders';

    setClient(apollo(true));
    setupLocales();

    const defaultArgs = {
        onSelect: (factoringProviderId) => {
            console.log('onSelect', factoringProviderId);
        },
        id: 'factoringProviderId',
        label: 'Accounting Scheme',
        factoringProviderId: mock.data.factoringProviders[0].id,
    };
    const requiredError = {
        form: {
            fields: {
                factoringProviderId: {
                    errors: ['required'],
                },
            },
        },
    };
</script>

<Meta
    title="Components/Factoring Provider/Select"
    component={FactoringProviderSelect}
    argTypes={{}}
/>

<Template let:args>
    <FactoringProviderSelect {...args} />
</Template>

<Story name="Select" args={defaultArgs} />
