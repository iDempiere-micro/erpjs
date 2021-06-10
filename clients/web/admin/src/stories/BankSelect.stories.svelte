<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import BankSelect from '../components/banks/BankSelect.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/banks';

    setClient(apollo(true));
    setupLocales();

    const defaultArgs = {
        onSelect: (bankId) => {
            console.log('onSelect', bankId);
        },
        id: 'bankId',
        label: 'Bank',
        bankId: mock.data.banks[0].id,
    };
    const requiredError = {
        form: {
            fields: {
                bankId: {
                    errors: ['required'],
                },
            },
        },
    };
</script>

<Meta title="Components/Bank/Select" component={BankSelect} argTypes={{}} />

<Template let:args>
    <BankSelect {...args} />
</Template>

<Story name="Select" args={defaultArgs} />
