<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import Button from '../dsl/Button.svelte';
</script>

<Meta title="DSL/Button" component={Button} argTypes={{
    label: { control: 'text' },
    className: { control: 'text' },
    classNameAdd: { control: 'text' },
}} />

<Template let:args>
    <Button {...args} on:click={args.onClick} />
</Template>

<Story name="Default" args={{}} />

<Story
    name="Primary"
    args={{
        primary: true,
        label: 'Button',
    }}
/>

<Story
    name="Secondary"
    args={{
        label: 'Button',
        primary: false,
    }}
/>

