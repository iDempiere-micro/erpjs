<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import AccountingSchemeDetail from '../pages/AccountingSchemeDetail.svelte';
    import { apollo, setClient } from '../lib/apollo';
    import { setupLocales } from '../i18n';
    import { mock1 } from '../lib/queries/accountingScheme';

    const client = apollo('', true);
    setClient(client);
    setupLocales();
</script>

<Meta
    title="Components/Accounting Scheme/Detail"
    component={AccountingSchemeDetail}
    argTypes={{}}
/>

<Template let:args>
    <AccountingSchemeDetail {...args} {client} />
</Template>

<Story name="Detail" />
