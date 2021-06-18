<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AddOrEditAccountingScheme from '../components/add-accountingScheme/AddOrEditAccountingScheme.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock1 } from '../lib/queries/accountingScheme';

    setClient(apollo({ forceMock: true }));
    setupLocales();
</script>

<Meta
    title="Components/Accounting Scheme/Add&Edit"
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
        accountingScheme: mock1.data.accountingScheme,
    }}
/>
