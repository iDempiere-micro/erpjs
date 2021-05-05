<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import BankDetail from '../components/bank-detail/BankDetail.svelte';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../../build/dist/lib/queries/banks';

    const client = apollo(true);

    setupLocales();
</script>

<Meta title="Components/Bank/Detail" component={BankDetail} argTypes={{}} />

<Template let:args>
    <BankDetail {...args} data={mock.data.banks[0]} />
</Template>

<Story name="Detail" />
