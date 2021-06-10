<script lang="ts">
    import { _ } from 'svelte-i18n';
    import Select from 'svelte-select';
    import { attachmentService } from '../../lib/core';
    import type { OnSelectMultiParam, OnSelectParam, SelectItem } from '../../lib/support/select';
    import { mapDisplayableToListItem, mapDisplayableToSelectItem } from '../../lib/support/util';

    attachmentService.loadList();
    let selectedAttachment: SelectItem | undefined;
    let selectedAttachments: SelectItem[] | undefined;
    export let onSelect: (attachmentId: string) => void = (attachmentId) => {};
    export let onSelectMulti: (attachmentIds: string[]) => void = (attachmentIds) => {};
    export let id: string;
    export let form: any = undefined;
    export let label: string | undefined = undefined;
    export let attachmentId: string | undefined = undefined;
    export let attachmentIds: string[] | undefined = undefined;
    export let isMulti: boolean = false;
    const store = attachmentService.stores.list;

    const handleSelectAttachment = (e: any) => {
        if (!isMulti) {
            const event = e as OnSelectParam;
            attachmentId = (event.detail as SelectItem).value.toString();
            onSelect && onSelect(attachmentId);
        } else {
            const event = e as OnSelectMultiParam;
            attachmentIds = event.detail ? event.detail.map((x) => x.value.toString()) : [];
            onSelectMulti && onSelectMulti(attachmentIds);
        }
    };

    $: {
        selectedAttachment = undefined;
        if (isMulti && attachmentIds) {
            const found = $store.data.filter((x) => attachmentIds!!.includes(x.id));
            if (found) {
                selectedAttachments = mapDisplayableToSelectItem(found);
            }
        } else if (!isMulti && attachmentId) {
            const found = $store.data.find((x) => x.id === attachmentId);
            if (found) {
                selectedAttachment = mapDisplayableToSelectItem([found])[0];
            }
        }
    }
</script>

{#if label}
    <label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
{/if}
<Select
    inputAttributes={{ id, 'data-testid': id, autocomplete: 'disabled' }}
    items={mapDisplayableToListItem($store.data)}
    selectedValue={isMulti ? selectedAttachments : selectedAttachment}
    {isMulti}
    on:select={handleSelectAttachment}
/>
{#if form && form.fields[id].errors.includes('required')}
    <label for={id} class="block text-sm font-small text-red-700">{$_('validator.required')}</label>
{/if}
