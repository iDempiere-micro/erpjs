<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { _ } from 'svelte-i18n';

    export let primary: boolean = true;
    export let disabled: boolean = false;
    export let className: string = primary
        ? 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
        : 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500';
    export let label: string = primary ? $_('actions.save') : 'Label';
    export let dataTestId: string = primary ? 'saveButton' : 'random';

    const dispatch = createEventDispatcher();

    /**
     * Optional click handler
     */
    function onClick(event: Event) {
        dispatch('click', event);
    }
</script>

{#if disabled}
    <button
        data-testid={dataTestId}
        type="submit"
        class={className}
        on:click|preventDefault={onClick}
        disabled>{label}</button
    >
{:else}
    <button
        data-testid={dataTestId}
        type="submit"
        class={className}
        on:click|preventDefault={onClick}>{label}</button
    >
{/if}
