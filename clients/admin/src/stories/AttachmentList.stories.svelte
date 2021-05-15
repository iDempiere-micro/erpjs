<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AttachmentList from '../components/attachments/AttachmentList.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/attachments';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Attachment/List" component={AttachmentList} argTypes={{}} />

<Template let:args>
    <AttachmentList {...args} />
</Template>

<Story name="List" args={{ attachments: mock.data.attachments }} />
