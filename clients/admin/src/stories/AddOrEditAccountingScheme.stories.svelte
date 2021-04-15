<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import AddOrEditAccountingScheme from '../components/add-accountingScheme/AddOrEditAccountingScheme.svelte';
    import { apollo, setClient } from '../lib/apollo';
    import { setupLocales } from '../i18n';

    setClient(apollo('', true));
    setupLocales();
</script>

<Meta
    title="Components/Add or Edit Accounting Scheme"
    component={AddOrEditAccountingScheme}
    argTypes={{}}
/>

<Template let:args>
    <AddOrEditAccountingScheme {...args} />
</Template>

<Story name="Add" />
<Story
    name="Edit"
    args={{
        accountingScheme: { displayName: 'Accounting Scheme 1', currency: { isoCode: 'ABC' } },
    }}
/>
