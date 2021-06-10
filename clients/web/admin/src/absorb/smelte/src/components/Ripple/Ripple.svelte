<script>
    import createRipple from '../../../../../dsl/ripple';

    export let color = 'primary';
    export let noHover = false;

    $: ripple = createRipple(color, true);
    $: hoverClass = `hover:bg-${color}-transLight`;
</script>

<span
    use:ripple
    class="z-40 {$$props.class} p-2 rounded-full flex items-center justify-center top-0 left-0 {noHover
        ? ''
        : hoverClass}"
>
    <slot />
</span>

<style>
    .ripple {
        position: absolute !important;
    }
</style>
