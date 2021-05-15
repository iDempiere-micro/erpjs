<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AddOrEditAttachment from '../components/add-attachment/AddOrEditAttachment.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock1 } from '../lib/queries/attachment';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Attachment/Add&Edit" component={AddOrEditAttachment} argTypes={{}} />

<Template let:args>
    <AddOrEditAttachment {...args} />
</Template>

<Story name="Add" />
<Story
    name="Edit"
    args={{
        attachment: mock1.data.attachment,
    }}
/>
