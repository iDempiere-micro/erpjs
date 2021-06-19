<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AccountingSchemeList from '../components/accountingSchemes/AccountingSchemeList.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/accountingSchemes';

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    setupLocales();
</script>

<Meta title="Components/Accounting Scheme/List" component={AccountingSchemeList} argTypes={{}} />

<Template let:args>
    <AccountingSchemeList {...args} />
</Template>

<Story name="List" args={{ accountingSchemes: mock.data.accountingSchemes }} />
