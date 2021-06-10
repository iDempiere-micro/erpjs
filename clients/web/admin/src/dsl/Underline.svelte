<script lang="ts">
    import utils, { ClassBuilder, filterProps } from './classes';
    import type { ErrorType } from './types';
    import { isTrue } from './validation';

    export let noUnderline = false;
    export let outlined = false;
    export let focused = false;
    export let error: ErrorType = false;
    export let color = 'primary';

    let defaultClasses = `mx-auto w-0`;

    export let add = '';
    export let remove = '';
    export let replace = '';

    export let lineClasses = defaultClasses;

    const { bg, border, txt, caret } = utils(color);

    const l = new ClassBuilder(lineClasses, defaultClasses);

    $: classes = l
        .flush()
        .add(txt(), focused && !error)
        .add('bg-error-500', isTrue(error))
        .add('w-full', focused || isTrue(error))
        .add(bg(), focused)
        .add(add)
        .remove(remove)
        .replace(replace)
        .get();

    const props = filterProps(
        ['focused', 'error', 'outlined', 'labelOnTop', 'prepend', 'bgcolor', 'color'],
        $$props,
    );
</script>

<div
    class="line absolute bottom-0 left-0 w-full bg-gray-600 {$$props.class}"
    class:hidden={noUnderline || outlined}
>
    <div class={classes} style="height: 2px; transition: width .2s ease" />
</div>

<style>
    .line {
        height: 1px;
    }
</style>
