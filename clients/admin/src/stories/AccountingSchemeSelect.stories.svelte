<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AccountingSchemeSelect from '../components/accountingSchemes/AccountingSchemeSelect.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/accountingSchemes';

    setClient(apollo(true));
    setupLocales();

    const defaultArgs = {
        onSelect: (accountingSchemeId) => {
            console.log('onSelect', accountingSchemeId);
        },
        id: 'accountingSchemeId',
        label: 'Accounting Scheme',
        accountingSchemeId: mock.data.accountingSchemes[0].id,
    };
    const requiredError = {
        form: {
            fields: {
                accountingSchemeId: {
                    errors: ['required'],
                },
            },
        },
    };
</script>

<Meta
    title="Components/Accounting Scheme/Select"
    component={AccountingSchemeSelect}
    argTypes={{}}
/>

<Template let:args>
    <AccountingSchemeSelect {...args} />
</Template>

<Story name="Select" args={defaultArgs} />
