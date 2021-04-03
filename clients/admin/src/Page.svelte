<script lang="ts">
    import Nav from './Nav.svelte';
    import { profileMenuOpened } from './lib/menu';

    export let title;
    export let segment;
    export let name;
</script>

<Nav {segment} />
<header class="bg-white shadow" on:click={() => profileMenuOpened.update((x) => false)}>
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <slot name="header">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">{title}</h1>
        </slot>
    </div>
</header>
<main on:click={() => profileMenuOpened.update((x) => false)}>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0" data-testid={name || 'random-' + Date.now()}>
            <slot name="content" />
        </div>
    </div>
</main>
