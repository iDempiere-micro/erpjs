<script lang="ts">
    import { routes } from './routes';
    import Router from 'svelte-spa-router';
    import './main.css';
    import { setupLocales } from './i18n';
    import { authenticate } from './keycloak';

    export let url = '';

    setupLocales();

    $: {
        authenticate();
    }
</script>

<Router {routes} />
