<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AccountingSchemeDetail from '../components/accountingScheme-detail/AccountingSchemeDetail.svelte';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock1 } from '../../build/dist/lib/queries/accountingScheme';

    const client = apollo(true);

    setupLocales();
</script>

<Meta
    title="Components/Accounting Scheme/Detail"
    component={AccountingSchemeDetail}
    argTypes={{}}
/>

<Template let:args>
    <AccountingSchemeDetail data={mock1.data.accountingScheme} {...args} />
</Template>

<Story name="Detail" />
