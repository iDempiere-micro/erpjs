<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let className: string = 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
    export let label: string = 'Label';

    const dispatch = createEventDispatcher();

    /**
     * Optional click handler
     */
    function onClick(event) {
        dispatch('click', event);
    }
</script>

<button class={className} on:click={onClick}>{label}</button>
