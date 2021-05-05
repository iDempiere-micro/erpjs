<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import OrganizationDetail from '../components/organization-detail/OrganizationDetail.svelte';

    const client = apollo(true);

    setupLocales();
</script>

<Meta title="Components/Organization/Detail" component={OrganizationDetail} argTypes={{}} />

<Template let:args>
    <OrganizationDetail {...args} />
</Template>

<Story name="Detail" />
