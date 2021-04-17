<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import Select from 'svelte-select';
</script>

<Meta title="DSL/Select" component={Select} argTypes={{}} />

<Template let:args>
    <div style="height: 100px;">
        <Select {...args} />
    </div>
</Template>

<Story name="Default" args={{}} />
<Story
    name="With items"
    args={{
        items: [
            { label: 'Item 1', value: 1 },
            { label: 'Item 2', value: 2 },
            { label: 'Item 3', value: 3 },
            { label: 'Item 4', value: 4 },
        ],
    }}
/>
