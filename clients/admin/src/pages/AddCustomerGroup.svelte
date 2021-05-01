<script lang="ts">
    import AddOrEditCustomerGroup from '../components/add-customerGroup/AddOrEditCustomerGroup.svelte';
    import { segments } from './pathAndSegment';
    import Page from '../Page.svelte';
    import { _ } from 'svelte-i18n';
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
