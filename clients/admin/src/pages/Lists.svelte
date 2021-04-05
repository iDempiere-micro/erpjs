<script lang="ts">
    import { apollo, setClient } from '../lib/apollo';
    import { urls } from './pathAndSegment';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';
    import { segments } from './pathAndSegment';

    const client = apollo(urls.products.list);
    setClient(client);
</script>

<Page title={$_('page.lists.title')} segment={segments.lists} name="page.lists">
    <span slot="content">
        <a
            href="#/{urls.products.list}"
            class="text-blue-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >{$_('page.products.title')}</a
        >
    </span>
</Page>
