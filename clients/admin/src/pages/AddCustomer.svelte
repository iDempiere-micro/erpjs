<script lang="ts">
    import { setClient, apollo } from '../lib/apollo';
    import AddOrEditCustomer from '../components/add-customer/AddOrEditCustomer.svelte';
    import { urls, segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';

    const client = apollo(urls.customer.add);
    setClient(client);
</script>

<Page
    title={$_('page.customers.add.title')}
    segment={segments.customers}
    name="page.customers.add.title"
>
    name={'page.customers.add.title'}
    <span slot="content">
        <AddOrEditCustomer {client} customer={null} />
    </span>
</Page>

<style>
    :global(input.invalid) {
        border-color: red;
    }
</style>
