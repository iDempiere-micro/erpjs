<script>
    import { ClassBuilder } from '../../../../../dsl/classes';
    import { createEventDispatcher } from 'svelte';
    import TextField from '../TextField';
    import Icon from '../Icon';

    const classesDefault =
        'absolute left-0 top-0 z-10 bg-white dark:bg-dark-400 p-2 shadow rounded';

    export let item = {};
    export let column = {};
    export let editing = false;

    export let classes = classesDefault;

    const dispatch = createEventDispatcher();

    const cb = new ClassBuilder(classes, classesDefault);
    $: c = cb.flush().add(classes, true, classesDefault).add($$props.class).get();
</script>

<div class={c} style="width: 300px">
    <slot>
        <TextField
            value={item[column.field]}
            textarea={column.textarea}
            on:change
            remove="bg-gray-100 bg-gray-300"
            on:blur={({ target }) => {
                editing = false;
                dispatch('update', {
                    item,
                    column,
                    value: target.value,
                });
            }}
        />
    </slot>
</div>
