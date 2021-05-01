<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AccountingSchemeDetail from '../pages/AccountingSchemeDetail.svelte';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';

    const client = apollo(true);

    setupLocales();
</script>

<Meta
    title="Components/Accounting Scheme/Detail"
    component={AccountingSchemeDetail}
    argTypes={{}}
/>

<Template let:args>
    <AccountingSchemeDetail {...args} />
</Template>

<Story name="Detail" />
