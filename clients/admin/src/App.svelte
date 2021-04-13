<script lang="ts">
    import { routes } from './routes';
    import Router from 'svelte-spa-router';
    import "./main.css";

    export let url = '';

    import { setupLocales } from './i18n';
    import { authenticate } from './keycloak';

    setupLocales();

    $: {
        authenticate();
    }
</script>

<Router {routes} />
