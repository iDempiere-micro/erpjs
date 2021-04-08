<script lang="ts">
    import { bindClass } from 'svelte-forms';

    export let title: string;
    export let type: string | null = null;
    export let form: any;
    export let min: number | null = null;
    export let id: string;
    export let value: any;
</script>

<div class="grid grid-cols-6 gap-6">
    <div class="col-span-6 sm:col-span-4">
        <label for={id} class="block text-sm font-medium text-gray-700">{title}</label>

        {#if $form.fields[id].errors.includes('required')}
            <label for={id} class="block text-sm font-small text-red-700">Required</label>
        {/if}

        {#if $form.fields[id].errors.includes('min')}
            <label for={id} class="block text-sm font-small text-red-700"
                >At least {min} characters</label
            >
        {/if}

        {#if !type || type === 'text'}
            <input
                type="text"
                {id}
                class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                autocomplete="disabled"
                bind:value
                use:bindClass={{ form }}
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
                on:blur|preventDefault={() => form.validate()}
            />
        {:else}
            <p>unknown type</p>
        {/if}
    </div>
</div>
