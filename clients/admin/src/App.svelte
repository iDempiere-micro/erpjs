<script lang="ts">
    import { routes } from './routes';
    import Router from 'svelte-spa-router';

    export let url = '';

    import { setupLocales } from './i18n';
    import { authenticate } from './keycloak';

    setupLocales();

    $: {
        authenticate();
    }
</script>

<Router {routes} />

<style global lang="postcss">
    /* only apply purgecss on utilities, per Tailwind docs */
    /* purgecss start ignore */
    @tailwind base;
    @tailwind components;
    /* purgecss end ignore */

    @tailwind utilities;
</style>
