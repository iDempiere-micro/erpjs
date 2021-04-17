<script>
    import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
    import SimpleTextBox from '../molecules/form/SimpleTextBox.svelte';
  
</script>

<Meta title="SimpleTextBox" component={SimpleTextBox} argTypes={{
    label: { control: 'text' },
    className: { control: 'text' },
    classNameAdd: { control: 'text' },
}} />

<Template let:args>
    <SimpleTextBox id='displayName' {...args} />
</Template>

<Story name="Default" args={{}} />
