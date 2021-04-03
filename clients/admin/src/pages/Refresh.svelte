<script lang="ts">
    import { push } from 'svelte-spa-router';
    import { _ } from 'svelte-i18n';
    import Page from '../Page.svelte';

    setTimeout(() => push('/'), 300);
</script>

<Page title={$_('status.refresh')} name="refresh">
    <span slot="content">
        {$_('status.refresh')}
    </span>
</Page>
