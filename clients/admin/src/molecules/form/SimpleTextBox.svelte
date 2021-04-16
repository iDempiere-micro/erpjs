<script lang="ts">
    import { bindClass } from 'svelte-forms';
    import { _ } from 'svelte-i18n';

    export let title: string;
    export let type: string | null = null;
    export let form: any;
    export let min: number | null = null;
    export let id: string;
    export let value: any;
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
