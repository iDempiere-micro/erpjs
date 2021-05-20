<script lang="ts">
    import { _ } from 'svelte-i18n';
    import TextField from '../../absorb/smelte/src/components/TextField/TextField.svelte';
    import DatePicker from '../../absorb/smelte/src/components/DatePicker/DatePicker.svelte';

    export let title: string;
    export let type: string | null = null;
    export let form: any;
    export let min: number | null = null;
    export let id: string;
    export let value: any;
    export let hideWrapper: boolean | null = null;

    let error = false;

    const onBlur = () => {
        try {
            form.validate();
            error = false;
            if ($form.fields[id].errors.includes('required')) {
                error = $_('validator.required');
            }
            if ($form.fields[id].errors.includes('min')) {
                error = $_('validator.minCharacters', { values: { min } });
            }
        } catch (e) {
            console.log('waaah', e);
        }
    };
</script>

{#if hideWrapper}
    {#if !type || type === 'text'}
        <TextField
            type="text"
            {id}
            class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
            autocomplete="disabled"
            bind:value
            data-testid={id}
            label={title}
            on:blur={onBlur}
            {error}
        />
    {:else if type === 'date'}
        <DatePicker
            {id}
            autocomplete="disabled"
            bind:value
            data-testid={id}
            on:blur={onBlur}
            {error}
        />
    {:else if type === 'number'}
        <TextField
            type="number"
            {id}
            class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
            autocomplete="disabled"
            bind:value
            data-testid={id}
            label={title}
            on:blur={onBlur}
            {error}
        />
    {:else}
        <p>unknown type</p>
    {/if}
{:else}
    <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6 sm:col-span-4">
            {#if !type || type === 'text'}
                <TextField
                    type="text"
                    {id}
                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                    autocomplete="disabled"
                    bind:value
                    data-testid={id}
                    label={title}
                    on:blur={onBlur}
                    {error}
                />
            {:else if type === 'date'}
                <DatePicker
                    {id}
                    autocomplete="disabled"
                    bind:value
                    data-testid={id}
                    on:blur={onBlur}
                    {error}
                />
            {:else if type === 'number'}
                <TextField
                    type="number"
                    {id}
                    class="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md"
                    autocomplete="disabled"
                    bind:value
                    data-testid={id}
                    label={title}
                    on:blur={onBlur}
                    {error}
                />
            {:else}
                <p>unknown type</p>
            {/if}
        </div>
    </div>
{/if}
