<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import AddOrEditCustomerGroup from '../components/add-customerGroup/AddOrEditCustomerGroup.svelte';
    import { urls } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';
    import { _ } from 'svelte-i18n';

    const client = apollo(urls.customerGroups.add);
    setClient(client);
</script>

<Page
    title={$_('page.customerGroups.add.title')}
    segment={segments.customerGroups}
    name="page.customerGroups.add.title"
>
    <span slot="content">
        <AddOrEditCustomerGroup customerGroup={undefined} />
    </span>
</Page>
