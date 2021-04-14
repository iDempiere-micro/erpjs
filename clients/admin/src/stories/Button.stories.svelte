<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Button from "../dsl/Button.svelte";
</script>

<Meta
  title="DSL/Button"
  component={Button}
  argTypes={{
    label: { control: "text" },
    className: { control: "text" },
    primary: { control: "boolean" },
    backgroundColor: { control: "color" },
    size: {
      control: { type: "select", options: ["small", "medium", "large"] },
    },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Button {...args} on:click={args.onClick} />
</Template>

<Story
  name="Primary"
  args={{
    primary: true,
    label: "Button",
    className: 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
  }}
/>

<Story
  name="Secondary"
  args={{
    label: "Button",
  }}
/>
<Story
  name="Large"
  args={{
    size: "large",
    label: "Button",
  }}
/>

<Story
  name="Small"
  args={{
    size: "small",
    label: "Button",
  }}
/>
