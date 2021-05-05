<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import BankList from '../components/banks/BankList.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/banks';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Bank/List" component={BankList} argTypes={{}} />

<Template let:args>
    <BankList {...args} />
</Template>

<Story name="List" args={{ banks: mock.data.banks }} />
