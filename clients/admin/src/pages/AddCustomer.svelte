<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditCustomer from '../components/add-customer/AddOrEditCustomer.svelte';
    import { segments, urls } from './pathAndSegment';
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
        <AddOrEditCustomer {client} customer={undefined} />
    </span>
</Page>
