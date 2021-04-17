<script lang="ts">
    import { bindClass } from 'svelte-forms';
    import { _ } from 'svelte-i18n';

    /**
     * the corresponding label title
     */
    export let title: string;
    /**
     * input type see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
     */
    export let type: string | null = null;
    /**
     * svelte-forms the input is living in see https://github.com/chainlist/svelte-forms.
     * Please note you must pass `myForm` and not  `$myForm`
     */
    export let form: any;
    /**
     * min input length
     */
    export let min: number | null = null;
    /**
     * the svelte-forms form id for this input
     */
    export let id: string;
    /**
     * input value
     */
    export let value: any;
    /**
     * if to hide the input wrapper. Please note this will be turned on by default in the next version.
     * and removed in the future
     */
    export let hideWrapper: boolean | null = null;
</script>

{#if hideWrapper}
    <label for={id} class="block text-sm font-medium text-gray-700">{title}</label>

    {#if !type || type === 'text'}
        <input
            type="text"
            {id}
            class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
            autocomplete="disabled"
            bind:value
            use:bindClass={{ form }}
            data-testid={id}
            on:blur|preventDefault={() => form.validate()}
        />
    {:else if type === 'date'}
        <input
            type="date"
            {id}
            class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
            autocomplete="disabled"
            bind:value
            use:bindClass={{ form }}
            data-testid={id}
            on:blur|preventDefault={() => form.validate()}
        />
    {:else if type === 'number'}
        <input
            type="number"
            {id}
            class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
            autocomplete="disabled"
            bind:value
            use:bindClass={{ form }}
            data-testid={id}
            on:blur|preventDefault={() => form.validate()}
        />
    {:else}
        <p>unknown type</p>
    {/if}

    {#if $form.fields[id].errors.includes('required')}
        <label for={id} class="block text-sm font-small text-red-700"
            >{$_('validator.required')}</label
        >
    {/if}

    {#if $form.fields[id].errors.includes('min')}
        <label for={id} class="block text-sm font-small text-red-700"
            >{$_('validator.minCharacters', { values: { min } })}</label
        >
    {/if}
{:else}
    <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6 sm:col-span-4">
            <label for={id} class="block text-sm font-medium text-gray-700">{title}</label>

            {#if !type || type === 'text'}
                <input
                    type="text"
                    {id}
                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                    autocomplete="disabled"
                    bind:value
                    use:bindClass={{ form }}
                    data-testid={id}
                    on:blur|preventDefault={() => form.validate()}
                />
            {:else if type === 'date'}
                <input
                    type="date"
                    {id}
                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                    autocomplete="disabled"
                    bind:value
                    use:bindClass={{ form }}
                    data-testid={id}
                    on:blur|preventDefault={() => form.validate()}
                />
            {:else if type === 'number'}
                <input
                    type="number"
                    {id}
                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                    autocomplete="disabled"
                    bind:value
                    use:bindClass={{ form }}
                    data-testid={id}
                    on:blur|preventDefault={() => form.validate()}
                />
            {:else}
                <p>unknown type</p>
            {/if}
            {#if $form.fields[id].errors.includes('required')}
                <label for={id} class="block text-sm font-small text-red-700"
                    >{$_('validator.required')}</label
                >
            {/if}

            {#if $form.fields[id].errors.includes('min')}
                <label for={id} class="block text-sm font-small text-red-700"
                    >{$_('validator.minCharacters', { values: { min } })}</label
                >
            {/if}
        </div>
    </div>
{/if}
