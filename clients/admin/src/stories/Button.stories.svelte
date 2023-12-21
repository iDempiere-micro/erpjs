<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import Button from '../dsl/Button.svelte';
</script>

<Meta
    title="DSL/Button"
    component={Button}
    argTypes={{
        label: { control: 'text' },
        className: { control: 'text' },
        primary: { control: 'boolean' },
        backgroundColor: { control: 'color' },
        size: {
            control: { type: 'select', options: ['small', 'medium', 'large'] },
        },
        onClick: { action: 'onClick' },
    }}
/>

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
<Story
    name="Large"
    args={{
        size: 'large',
        label: 'Button',
    }}
/>

<Story
    name="Small"
    args={{
        size: 'small',
        label: 'Button',
    }}
/>
