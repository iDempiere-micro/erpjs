<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import OrganizationSelect from '../components/organizations/OrganizationSelect.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/organizations';

    setClient(apollo(true));
    setupLocales();

    const defaultArgs = {
        onSelect: (organizationId) => {
            console.log('onSelect', organizationId);
        },
        id: 'organizationId',
        label: 'Organization',
        organizationId: mock.data.organizations[0].id,
    };
    const requiredError = {
        form: {
            fields: {
                organizationId: {
                    errors: ['required'],
                },
            },
        },
    };
</script>

<Meta title="Components/Organization/Select" component={OrganizationSelect} argTypes={{}} />

<Template let:args>
    <OrganizationSelect {...args} />
</Template>

<Story name="Select" args={defaultArgs} />
