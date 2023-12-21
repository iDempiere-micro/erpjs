<script lang="ts">
    import AddOrEditCustomer from '../components/add-customer/AddOrEditCustomer.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
</script>

<Page
    title={$_('page.customers.add.title')}
    segment={segments.customers}
    name="page.customers.add.title"
>
    name={'page.customers.add.title'}
    <span slot="content">
        <AddOrEditCustomer customer={undefined} />
    </span>
</Page>
