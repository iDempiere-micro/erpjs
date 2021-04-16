<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { _ } from 'svelte-i18n';

    /**
     * Is the button the primary form button?
     */
    export let primary: boolean = true;
    /**
     * Is the button disabled?
     */
    export let disabled: boolean = false;
    /**
     * The class names that are added at the end of the default class names (defined e.g. by primary attribute)
     */
    export let classNameAdd: string = '';
    /**
     * The class names for the button; this can be predefined by the primary and disabled attributes
     */
    export let className: string = primary
        ? 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ' +
          classNameAdd
        : 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ' +
          classNameAdd;
    /**
     * The button label
     */
    export let label: string = primary ? $_('actions.save') : 'Label';
    /**
     * The data-testid attribute
     */
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
