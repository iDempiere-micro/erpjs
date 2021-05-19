<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from "smelte/src/components/Select";
    import { countryService } from '../../lib/core';
    import { mapDisplayableToSelectItem } from '../../lib/support/util';

    countryService.loadList();
    export let onSelect: (countryId: number) => void = (countryId) => {};
    export let id: string;
    export let form: any;
    export let label: string;
    export let countryId: number | undefined;
    const store = countryService.stores.list;
    let error = false;

    const onBlur = () => {
        console.log('muhehe', form);
        try {
            form.validate();
            error = false;
            if ($form.fields[id].errors.includes('required')) {
                error = $_('validator.required');
            }
        } catch (e) {
            console.log('waaah', e);
        }
    }
    onBlur();
</script>

<Select bind:value={countryId} outlined autocomplete {error} {label}
        items={mapDisplayableToSelectItem($store.data)} on:blur={onBlur} />

