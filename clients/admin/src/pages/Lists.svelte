<script lang="ts">
    import { segments, urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
</script>

<Page title={$_('page.lists.title')} segment={segments.lists} name="page.lists">
    <span slot="content">
        <a
            href="#/{urls.products.list}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.products.title')}</a
        >

        <a
            href="#/{urls.countries.list}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.countries.title')}</a
        >

        <a
            href="#/{urls.currencies.list}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.currencies.title')}</a
        >

        <a
            href="#/{urls.banks.list}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.banks.title')}</a
        >

        <a
            href="#/{urls.organizations.list}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.organizations.title')}</a
        >
        <a
            href="#/{urls.accountingSchemes.list}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.accountingSchemes.title')}</a
        >
        <a
            href="#/{urls.customerGroups.list}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.customerGroups.title')}</a
        >
        <a
            href="#/{urls.factoringProviders.list}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.factoringProviders.title')}</a
        >
        <a
            href="#/{urls.factoringContracts.list}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.factoringContracts.title')}</a
        >
    </span>
</Page>
